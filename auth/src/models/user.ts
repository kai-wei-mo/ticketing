import mongoose from 'mongoose';

// todo: research better solution for integration TS and Mongoose

// props of User
interface UserAttrs {
	email: string;
	password: string;
}

// props of User Model
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// props of User Document
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

User.build({
	email: 'test@test.com',
	password: 'password123',
});

export { User };
