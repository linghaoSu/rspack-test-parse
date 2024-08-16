interface Config {
  url?: string;
  appId?: string;
  scope: string;
  module: string;
}

/* eslint-disable no-undef */
function loadScript(config: Config) {
  return new Promise((resolve, reject) => {
    let { url } = config;
    const { appId } = config;

    if (!url && !appId) reject(new Error('Need Url or AppID'));

    if (!url && appId) {

      url = `${process.env.remote}/remoteEntry.js`;
    }

    const element = document.createElement('script');

    element.src = url ?? '';
    element.type = 'text/javascript';
    element.async = true;

    console.info(`Start Loading ${url}!`);

    element.onload = () => {
      console.info(`${url} Loaded Success!`);
      document.head.removeChild(element);
      resolve(true);
    };

    element.onerror = (error) => {
      console.error(`${url} Load Remote Entry Error!`);
      document.head.removeChild(element);
      reject(error);
    };

    document.head.appendChild(element);
  });
}

async function loadComponentByWebpack({ scope, module }: Config) {
  // 初始化共享作用域（shared scope）用提供的已知此构建和所有远程的模块填充它
  await __webpack_init_sharing__('default');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const container = (window as any)[scope]; // 或从其他地方获取容器

  // 初始化容器 它可能提供共享模块
  // eslint-disable-next-line camelcase
  await container.init(__webpack_share_scopes__.default);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const factory = await ((window as any)[scope]).get(module);

  return factory();
}

export default function loadRemoteComponent(config: Config) {
  return loadScript(config)
    .then(() => {
      const webpackComp = loadComponentByWebpack(config);

      const cp = defineAsyncComponent(async () => webpackComp);

      return cp;
    });
}
