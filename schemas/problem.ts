import { relationship, timestamp, text, select } from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";
import { list } from "@keystone-next/keystone/schema";
import { isNotEmptyStringOrNonNull } from "../hooks/inputOrUpdate";


export const problemSchema = list({
    fields: {
        title: text({
            hooks: {
                validateInput: isNotEmptyStringOrNonNull
            },
            isRequired: true
        }),
        status: select({
            options: [
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
            ],
            ui: {
                displayMode: 'segmented-control',
            },
        }),
        // @ts-ignore
        body: document({
            formatting: true,            
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
                [1]
            ],
            links: true,
            dividers: true,
        }),
        publishDate: timestamp(),
        publishedAs: select({
            options: [
                { label: 'Author', value: 'author'},
                { label: 'Anonymous', value: 'anonymous'}
            ],
            defaultValue: "author",
            ui: {
                displayMode: "segmented-control"
            }
        }),
        author: relationship({
            ref: 'User.problems',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'email'],
                inlineEdit: { fields: ['name', 'email'] },
                linkToItem: true,
                inlineCreate: { fields: ['name', 'email'] },
            },
        }),
        problemTags: relationship({
            ref: 'ProblemTag.problems',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] },
            },
            many: true,
            label: "tag"
        }),
    },
    db: {
        idField: { kind: 'cuid'}
    }
})