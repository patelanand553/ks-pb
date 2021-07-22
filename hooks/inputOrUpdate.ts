import { ListHooks, BaseGeneratedListTypes } from "@keystone-next/types";


type ArgsForCreateOrUpdateOperation = Parameters<NonNullable<ListHooks<BaseGeneratedListTypes>['validateInput']>>[0];

export type ValidateInputHook = (args: ArgsForCreateOrUpdateOperation & { fieldPath: any }) => Promise<void> | void;

export const isNotEmptyStringOrNonNull: ValidateInputHook = ({ resolvedData, fieldPath, addValidationError }) => {
    let name: String | null = resolvedData[fieldPath];
    resolvedData[fieldPath] = name?.trim(); // remove extra white space
    if (!resolvedData[fieldPath]) {
        addValidationError(`${fieldPath} can not be empty String or Null.`)
    }

    return resolvedData[fieldPath];
}