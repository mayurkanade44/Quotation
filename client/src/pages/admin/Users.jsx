import { useForm, Controller } from "react-hook-form";
import {
  AlertMessage,
  Button,
  InputRow,
  InputSelect,
  Loading,
} from "../../components";
import { roles } from "../../utils/constData";
import { toast } from "react-toastify";
import {
  useAllUserQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
} from "../../redux/userSlice";
import { useState } from "react";

const Users = () => {
  const [editData, setEditData] = useState({ status: false, id: "" });
  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const { data: allUser, isLoading: userLoading, error } = useAllUserQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const editUser = (user) => {
    setEditData({ status: true, id: user._id });
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("role", { label: user.role, value: user.role });
  };

  const cancelEdit = () => {
    setEditData({ status: false, id: "" });
    reset();
  };

  const submit = async (data) => {
    let res;
    try {
      if (editData.status) {
        res = await updateUser({ data, id: editData.id }).unwrap();
      } else {
        res = await registerUser(data).unwrap();
      }
      setEditData({ status: false, id: "" });
      toast.success(res.msg);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <div className="mx-10 mt-20 w-full">
      {registerLoading || userLoading ? (
        <Loading />
      ) : (
        error && <AlertMessage>{error?.data?.msg || error.error}</AlertMessage>
      )}
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
        {!editData.status && (
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
        )}
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
        <div className="md:col-span-2 lg:col-span-4 text-center mt-2">
          <Button
            label={editData.status ? "Update User" : "Add New User"}
            type="submit"
          />
          {editData.status && (
            <Button label="Cancel" onClick={cancelEdit} color="bg-gray-500" />
          )}
        </div>
      </form>
      <div className="overflow-y-auto my-4 bg-white">
        <table className="w-full border whitespace-nowrap  dark:border-neutral-500">
          <thead>
            <tr className="h-8 w-full text-md leading-none text-gray-600">
              <th className="font-bold text-left dark:border-neutral-800 border-2 px-3">
                Full Name
              </th>
              <th className="font-bold text-left dark:border-neutral-800 border-2 px-3">
                Email
              </th>
              <th className="font-bold text-left dark:border-neutral-800 border-2 px-3">
                Role
              </th>
              <th className="font-bold text-left dark:border-neutral-800 border-2 px-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {allUser?.map((user) => (
              <tr
                key={user._id}
                className="h-8 text-sm leading-none text-gray-700 border-b dark:border-neutral-500 bg-white hover:bg-gray-100"
              >
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {user.name}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {user.email}
                </td>
                <td className="px-3 border-r font-normal dark:border-neutral-500">
                  {user.role}
                </td>
                <td className="px-3 border-r flex font-normal dark:border-neutral-500">
                  <Button label="Edit" onClick={() => editUser(user)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
