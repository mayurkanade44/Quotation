import { useForm, Controller } from "react-hook-form";
import { Button, InputRow, InputSelect } from "../../components";
import { roles } from "../../utils/constData";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../redux/userSlice";

const Users = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const submit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      toast.success(res.msg);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">All Users</h2>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid md:grid-cols-2 lg:grid-cols-4 my-2 gap-x-2"
      >
        <div>
          <InputRow
            label="Full Name"
            id="name"
            errors={errors}
            register={register}
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.name && "Name is required"}
          </p>
        </div>
        <div>
          <InputRow
            label="Email"
            id="email"
            errors={errors}
            register={register}
            type="email"
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.email && "Email id is required"}
          </p>
        </div>
        <div>
          <InputRow
            label="Password"
            id="password"
            errors={errors}
            register={register}
            type="text"
            placeholder=""
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.password && "Password is required"}
          </p>
        </div>
        <div>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Select role for the user" }}
            render={({ field: { onChange, value, ref } }) => (
              <InputSelect
                options={roles}
                onChange={onChange}
                value={value}
                label="Sales Person"
              />
            )}
          />
          <p className="text-xs text-red-500 -bottom-4 pl-1">
            {errors.role?.message}
          </p>
        </div>
        <div className="col-span-4 text-center mt-2">
          <Button label="Add User" type="submit" />
        </div>
      </form>
    </div>
  );
};
export default Users;
