import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields"
import { isNotEmptyStringOrNonNull } from "../hooks/inputOrUpdate";
import { cloudinaryImage } from '@keystone-next/cloudinary';
import dotenv from 'dotenv';
dotenv.config();

export const userSchema = list({
    ui: {
        listView: {
            initialColumns: ['name', 'problems'],
        },
    },
    fields: {
        name: text({ isRequired: true }),
        email: text({
            isRequired: true, isUnique: true,
            hooks: {
                validateInput: isNotEmptyStringOrNonNull
            }
        }),
        password: password({
            isRequired: true,
        }),
        image: cloudinaryImage({
            isRequired: true,
            cloudinary: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey:process.env.CLOUDINARY_KEY,
                apiSecret: process.env.CLOUDINARY_SECRET,
                folder: "NEXT-KEYSTONE"

            }
        }),
        problems: relationship({ ref: 'Problem.author', many: true }),
    },
    db: {
        idField: { kind: "cuid" }
    }
})