import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
});
export default model('user', userSchema);
