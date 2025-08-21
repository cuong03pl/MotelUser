import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { ResetPassword } from "../services/fetchAPI";
import { PasswordIcon, EyeOpenIcon } from "../components/Icon/Icon";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resetToken = queryParams.get("token");
        const userEmail = queryParams.get("email");

        if (!resetToken || !userEmail) {
            toast.error("Token hoặc email không hợp lệ hoặc đã hết hạn");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }

        const decodedToken = decodeURIComponent(resetToken);
        setToken(decodedToken);
        setEmail(userEmail);
    }, [location, navigate]);

    const schema = yup
        .object({
            password: yup
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ in hoa")
                .matches(/\d/, "Mật khẩu phải chứa ít nhất một số")
                .matches(
                    /[^A-Za-z0-9]/,
                    "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
                )
                .required("Vui lòng nhập mật khẩu"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
                .required("Vui lòng nhập xác nhận mật khẩu"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const successNotify = (message) =>
        toast.success(message, {
            position: "bottom-right",
            pauseOnHover: false,
        });

    const errorNotify = (message) =>
        toast.error(message, {
            position: "bottom-right",
            pauseOnHover: false,
        });

    const handleResetPassword = async () => {
        if (!token || !email) {
            errorNotify("Token hoặc email không hợp lệ hoặc đã hết hạn");
            return;
        }

        setIsLoading(true);
        try {
            const res = await ResetPassword({
                email: email,
                token: token,
                newPassword: password
            });
            successNotify("Đặt lại mật khẩu thành công");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            if (error.response?.data) {
                if (error.response.data.Message) {
                    errorNotify(error.response.data.Message);
                } else if (error.response.data[0]?.description) {
                    errorNotify(error.response.data[0].description);
                } else {
                    errorNotify("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
                }
            } else {
                errorNotify("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mx-auto max-w-[1000px] p-4 md:p-8 2xl:p-10">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                        <div className="hidden w-full xl:block xl:w-1/2">
                            <div className="py-17.5 px-26 text-center">
                                <span className="mt-15 inline-block">
                                    <svg
                                        width="350"
                                        height="350"
                                        viewBox="0 0 350 350"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M33.5825 294.844L30.5069 282.723C25.0538 280.414 19.4747 278.414 13.7961 276.732L13.4079 282.365L11.8335 276.159C4.79107 274.148 0 273.263 0 273.263C0 273.263 6.46998 297.853 20.0448 316.653L35.8606 319.429L23.5737 321.2C25.2813 323.253 27.1164 325.196 29.0681 327.019C48.8132 345.333 70.8061 353.736 78.1898 345.787C85.5736 337.838 75.5526 316.547 55.8074 298.235C49.6862 292.557 41.9968 288.001 34.2994 284.415L33.5825 294.844Z"
                                            fill="#F2F2F2"
                                        />
                                        <path
                                            d="M62.8332 281.679L66.4705 269.714C62.9973 264.921 59.2562 260.327 55.2652 255.954L52.019 260.576L53.8812 254.45C48.8923 249.092 45.2489 245.86 45.2489 245.86C45.2489 245.86 38.0686 270.253 39.9627 293.358L52.0658 303.903L40.6299 299.072C41.0301 301.712 41.596 304.324 42.3243 306.893C49.7535 332.77 64.2336 351.323 74.6663 348.332C85.0989 345.341 87.534 321.939 80.1048 296.063C77.8019 288.041 73.5758 280.169 68.8419 273.123L62.8332 281.679Z"
                                            fill="#F2F2F2"
                                        />
                                        <path
                                            d="M243.681 82.9153H241.762V30.3972C241.762 26.4054 240.975 22.4527 239.447 18.7647C237.918 15.0768 235.677 11.7258 232.853 8.90314C230.028 6.0805 226.674 3.84145 222.984 2.31385C219.293 0.786245 215.337 0 211.343 0H99.99C91.9222 0 84.1848 3.20256 78.48 8.90314C72.7752 14.6037 69.5703 22.3354 69.5703 30.3972V318.52C69.5703 322.512 70.3571 326.465 71.8859 330.153C73.4146 333.841 75.6553 337.192 78.48 340.015C81.3048 342.837 84.6582 345.076 88.3489 346.604C92.0396 348.131 95.9952 348.918 99.99 348.918H211.343C219.41 348.918 227.148 345.715 232.852 340.014C238.557 334.314 241.762 326.582 241.762 318.52V120.299H243.68L243.681 82.9153Z"
                                            fill="#E6E6E6"
                                        />
                                        <path
                                            d="M212.567 7.9054H198.033C198.701 9.54305 198.957 11.3199 198.776 13.0793C198.595 14.8387 197.984 16.5267 196.997 17.9946C196.01 19.4625 194.676 20.6652 193.114 21.4967C191.552 22.3283 189.809 22.7632 188.039 22.7632H124.247C122.477 22.7631 120.734 22.3281 119.172 21.4964C117.61 20.6648 116.277 19.462 115.289 17.9942C114.302 16.5263 113.691 14.8384 113.511 13.079C113.33 11.3197 113.585 9.54298 114.254 7.9054H100.678C94.6531 7.9054 88.8749 10.297 84.6146 14.5542C80.3543 18.8113 77.9609 24.5852 77.9609 30.6057V318.31C77.9609 324.331 80.3543 330.105 84.6146 334.362C88.8749 338.619 94.6531 341.011 100.678 341.011H212.567C218.592 341.011 224.37 338.619 228.63 334.362C232.891 330.105 235.284 324.331 235.284 318.31V30.6053C235.284 24.5848 232.891 18.811 228.63 14.554C224.37 10.297 218.592 7.9054 212.567 7.9054Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M142.368 122.512C142.368 120.501 142.898 118.526 143.904 116.784C144.911 115.043 146.359 113.597 148.102 112.592C146.36 111.587 144.383 111.057 142.371 111.057C140.358 111.057 138.381 111.586 136.639 112.591C134.896 113.596 133.448 115.042 132.442 116.784C131.436 118.525 130.906 120.501 130.906 122.512C130.906 124.522 131.436 126.498 132.442 128.239C133.448 129.981 134.896 131.427 136.639 132.432C138.381 133.437 140.358 133.966 142.371 133.966C144.383 133.966 146.36 133.436 148.102 132.431C146.359 131.426 144.911 129.981 143.905 128.24C142.898 126.499 142.368 124.523 142.368 122.512Z"
                                            fill="#CCCCCC"
                                        />
                                        <path
                                            d="M156.779 122.512C156.778 120.501 157.308 118.526 158.315 116.784C159.321 115.043 160.769 113.597 162.513 112.592C160.77 111.587 158.793 111.057 156.781 111.057C154.769 111.057 152.792 111.586 151.049 112.591C149.306 113.596 147.859 115.042 146.852 116.784C145.846 118.525 145.316 120.501 145.316 122.512C145.316 124.522 145.846 126.498 146.852 128.239C147.859 129.981 149.306 131.427 151.049 132.432C152.792 133.437 154.769 133.966 156.781 133.966C158.793 133.966 160.77 133.436 162.513 132.431C160.769 131.426 159.322 129.981 158.315 128.24C157.308 126.499 156.779 124.523 156.779 122.512Z"
                                            fill="#CCCCCC"
                                        />
                                        <path
                                            d="M170.862 133.966C177.192 133.966 182.325 128.838 182.325 122.512C182.325 116.186 177.192 111.057 170.862 111.057C164.531 111.057 159.398 116.186 159.398 122.512C159.398 128.838 164.531 133.966 170.862 133.966Z"
                                            fill="#3056D3"
                                        />
                                        <path
                                            d="M190.017 158.289H123.208C122.572 158.288 121.962 158.035 121.512 157.586C121.062 157.137 120.809 156.527 120.809 155.892V89.1315C120.809 88.496 121.062 87.8866 121.512 87.4372C121.962 86.9878 122.572 86.735 123.208 86.7343H190.017C190.653 86.735 191.263 86.9878 191.713 87.4372C192.163 87.8866 192.416 88.496 192.416 89.1315V155.892C192.416 156.527 192.163 157.137 191.713 157.586C191.263 158.035 190.653 158.288 190.017 158.289ZM123.208 87.6937C122.826 87.6941 122.46 87.8457 122.19 88.1154C121.92 88.385 121.769 88.7507 121.768 89.132V155.892C121.769 156.274 121.92 156.639 122.19 156.909C122.46 157.178 122.826 157.33 123.208 157.33H190.017C190.399 157.33 190.765 157.178 191.035 156.909C191.304 156.639 191.456 156.274 191.457 155.892V89.132C191.456 88.7507 191.304 88.385 191.035 88.1154C190.765 87.8457 190.399 87.6941 190.017 87.6937H123.208Z"
                                            fill="#CCCCCC"
                                        />
                                        <path
                                            d="M204.934 209.464H102.469V210.423H204.934V209.464Z"
                                            fill="#CCCCCC"
                                        />
                                        <path
                                            d="M105.705 203.477C107.492 203.477 108.941 202.029 108.941 200.243C108.941 198.457 107.492 197.01 105.705 197.01C103.918 197.01 102.469 198.457 102.469 200.243C102.469 202.029 103.918 203.477 105.705 203.477Z"
                                            fill="#3056D3"
                                        />
                                        <path
                                            d="M204.934 241.797H102.469V242.757H204.934V241.797Z"
                                            fill="#CCCCCC"
                                        />
                                        <path
                                            d="M105.705 235.811C107.492 235.811 108.941 234.363 108.941 232.577C108.941 230.791 107.492 229.344 105.705 229.344C103.918 229.344 102.469 230.791 102.469 232.577C102.469 234.363 103.918 235.811 105.705 235.811Z"
                                            fill="#3056D3"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                            <div className="w-full p-4 sm:p-10 xl:p-12">
                                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                    Đặt lại mật khẩu
                                </h2>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register("password")}
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={isShowPass ? "text" : "password"}
                                            placeholder="Ít nhất 6 ký tự, 1 chữ in hoa, 1 số"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />

                                        <span className="absolute right-4 top-2">
                                            {isShowPass && password && (
                                                <button
                                                    onClick={() => setIsShowPass(false)}
                                                    className=""
                                                >
                                                    <PasswordIcon width="22" height="22" />
                                                </button>
                                            )}

                                            {!isShowPass && password && (
                                                <button
                                                    onClick={() => setIsShowPass(true)}
                                                    className=""
                                                >
                                                    <EyeOpenIcon width="22" height="22" />
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <span className="text-[#ff0000] text-[14px]">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register("confirmPassword")}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmPassword}
                                            type={isShowConfirmPass ? "text" : "password"}
                                            placeholder="Nhập lại mật khẩu"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />

                                        <span className="absolute right-4 top-2">
                                            {isShowConfirmPass && confirmPassword && (
                                                <button
                                                    onClick={() => setIsShowConfirmPass(false)}
                                                    className=""
                                                >
                                                    <PasswordIcon width="22" height="22" />
                                                </button>
                                            )}

                                            {!isShowConfirmPass && confirmPassword && (
                                                <button
                                                    onClick={() => setIsShowConfirmPass(true)}
                                                    className=""
                                                >
                                                    <EyeOpenIcon width="22" height="22" />
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                    {errors.confirmPassword && (
                                        <span className="text-[#ff0000] text-[14px]">
                                            {errors.confirmPassword.message}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <button
                                        type="button"
                                        onClick={handleSubmit(handleResetPassword)}
                                        disabled={isLoading}
                                        className="w-full cursor-pointer rounded-lg bg-[#fa6819] p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
                                    >
                                        {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        <Link to="/login" className="text-primary">
                                            Quay lại đăng nhập
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 