import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isNotEmptyStringOrNonNull } from "../hooks/inputOrUpdate";


export const problemTagSchema = list({
    ui: {
        isHidden: true,
    },
    fields: {
        name: text({
            hooks: {
                validateInput: isNotEmptyStringOrNonNull
            }
        }),
        problems: relationship({
            ref: 'Problem.problemTags',
            many: true,
        }),
    },
    db: {
        idField: { kind: "autoincrement" }
    }
});