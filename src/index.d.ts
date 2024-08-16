/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
}

type ExtractPropTypesFromComponent<T> = Mutable<InstanceType<T>['$props']>;

type InternalInputStatus = 'default' | 'error' | 'success' ;

interface Window {
  __POWERED_BY_QIANKUN__?: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  __INJECTED_FETCH_REQUEST__?: boolean;
  __AMAMBA_ORIGIN_FETCH__?: typeof window['fetch'];
  // eslint-disable-next-line camelcase
}

interface ListFormType {
  searchKey: string;
}

interface StoreMutation {
  type: string;
  payload: unknown;
}

type SubscribeHook = (
  mutation: StoreMutation,
  state: Record<string, unknown>
) => void;

interface SharedStore {
  subscribe(hook: SubscribeHook);
}

declare interface QiankunProps {
  container?: HTMLElement;
  routerBase?: string;
  basePath?: string;
  sharedStore?: SharedStore;
  onGlobalStateChange?: (arg0: (state: unknown, prev: unknown) => void) => void;
  setGlobalState?: (arg0: { [string]: unknown }) => void;
}

declare module 'js-yaml'
declare module 'marked';

declare module '@lljj/vjsf-utils/vue3Utils' {
  const resolveComponent = (component: any) => any;
}

declare module '@lljj/vjsf-utils/utils' {
  const parseDateString = (dateString: string, includeTime: boolean) => any;
}

declare module '@lljj/vjsf-utils/formUtils' {}
declare module '@lljj/vjsf-utils/schema' {}
declare module '@lljj/vjsf-utils/schema/getDefaultFormState' {
  type getDefaultFormState = (
    _schema: any,
    formData: any,
    rootSchema?: any,
    includeUndefinedValues?: boolean,
    haveAllFields?: boolean) => any
}
declare module '@lljj/vue3-form-core' {
  const createForm = (globalOptions?: any) => any;

  export default createForm;
}

type RemoteComponentRef = {
  confirm: () => Promise<{ valid: boolean, data: Deployment | StatefulSet }>;
}

// eslint-disable-next-line camelcase, no-underscore-dangle
declare let __webpack_init_sharing__: (scope: string) => Promise<void>;
// eslint-disable-next-line camelcase, no-underscore-dangle
declare let __webpack_share_scopes__: {
  [propsName: string]: any;
};
