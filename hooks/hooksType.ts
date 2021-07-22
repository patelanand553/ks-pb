import type { BaseGeneratedListTypes, KeystoneContext } from '@keystone-next/types'

export type ListHooks<TGeneratedListTypes extends BaseGeneratedListTypes> = {
  /**
   * Used to **modify the input** for create and update operations after default values and access control have been applied
   */
  resolveInput?: ResolveInputHook<TGeneratedListTypes>;
  /**
   * Used to **validate the input** for create and update operations once all resolveInput hooks resolved
   */
  validateInput?: ValidateInputHook<TGeneratedListTypes>;
  /**
   * Used to **cause side effects** before a create or update operation once all validateInput hooks have resolved
   */
  beforeChange?: BeforeChangeHook<TGeneratedListTypes>;
  /**
   * Used to **cause side effects** after a create or update operation operation has occurred
   */
  afterChange?: AfterChangeHook<TGeneratedListTypes>;
  /**
   * Used to **validate** that a delete operation can happen after access control has occurred
   */
  validateDelete?: ValidateDeleteHook<TGeneratedListTypes>;
  /**
   * Used to **cause side effects** before a delete operation operation has occurred
   */
  beforeDelete?: BeforeOrAfterDeleteHook<TGeneratedListTypes>;
  /**
   * Used to **cause side effects** after a delete operation operation has occurred
   */
  afterDelete?: BeforeOrAfterDeleteHook<TGeneratedListTypes>;
};

// TODO: probably maybe don't do this and write it out manually
// (this is also incorrect because the return value is wrong for many of them)
export type AddFieldPathToObj<T extends (arg: any) => any> = T extends (args: infer Args) => infer Result
  ? (args: Args & { fieldPath: string }) => Result
  : never;

export type AddFieldPathArgToAllPropsOnObj<T extends Record<string, (arg: any) => any>> = {
  [Key in keyof T]: AddFieldPathToObj<T[Key]>;
};

export type FieldHooks<TGeneratedListTypes extends BaseGeneratedListTypes> =
  AddFieldPathArgToAllPropsOnObj<ListHooks<TGeneratedListTypes>>;

export type ArgsForCreateOrUpdateOperation<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  | {
      operation: 'create';
      // technically this will never actually exist for a create
      // but making it optional rather than not here
      // makes for a better experience
      // because then people will see the right type even if they haven't refined the type of operation to 'create'
      existingItem?: TGeneratedListTypes['backing'];
      /**
       * The GraphQL input **before** default values are applied
       */
      originalInput: TGeneratedListTypes['inputs']['create'];
      /**
       * The GraphQL input **after** default values are applied
       */
      resolvedData: TGeneratedListTypes['inputs']['create'];
    }
  | {
      operation: 'update';
      existingItem: TGeneratedListTypes['backing'];
      /**
       * The GraphQL input **before** default values are applied
       */
      originalInput: TGeneratedListTypes['inputs']['update'];
      /**
       * The GraphQL input **after** default values are applied
       */
      resolvedData: TGeneratedListTypes['inputs']['update'];
    }
) & {
  context: KeystoneContext;
  /**
   * The key of the list that the operation is occurring on
   */
  listKey: string;
};

export type ValidationArgs = {
  addValidationError: (error: string, data?: {}, internalData?: {}) => void;
};

export type ResolveInputHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForCreateOrUpdateOperation<TGeneratedListTypes>
) =>
  | Promise<TGeneratedListTypes['inputs']['create'] | TGeneratedListTypes['inputs']['update']>
  | TGeneratedListTypes['inputs']['create']
  | TGeneratedListTypes['inputs']['update']
  // TODO: I'm pretty sure this is wrong, but without these additional types you can't define a
  // resolveInput hook for a field that returns a simple value (e.g timestamp)
  | Record<string, any>
  | string
  | number
  | boolean
  | null;

export type ValidateInputHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForCreateOrUpdateOperation<TGeneratedListTypes> & ValidationArgs
) => Promise<void> | void;

export type BeforeChangeHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForCreateOrUpdateOperation<TGeneratedListTypes>
) => Promise<void> | void;

export type AfterChangeHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForCreateOrUpdateOperation<TGeneratedListTypes> & {
    updatedItem: TGeneratedListTypes['backing'];
  }
) => Promise<void> | void;

export type ArgsForDeleteOperation<TGeneratedListTypes extends BaseGeneratedListTypes> = {
  operation: 'delete';
  existingItem: TGeneratedListTypes['backing'];
  context: KeystoneContext;
  listKey: string;
};

export type ValidateDeleteHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForDeleteOperation<TGeneratedListTypes> & ValidationArgs
) => Promise<void> | void;

export type BeforeOrAfterDeleteHook<TGeneratedListTypes extends BaseGeneratedListTypes> = (
  args: ArgsForDeleteOperation<TGeneratedListTypes>
) => Promise<void> | void;