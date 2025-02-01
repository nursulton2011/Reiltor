import { Heading } from "../../components/typography/Heading"; // Импорт компонента заголовка
import { Button, Input } from "../../components/UI/index"; // Импорт кнопки и поля ввода
import "./RegistrationPage.scss"; // Импорт стилей страницы регистрации
import * as yup from "yup"; // Библиотека для валидации данных
import { yupResolver } from "@hookform/resolvers/yup"; // Интеграция yup с react-hook-form
import { Controller, SubmitHandler, useForm } from "react-hook-form"; // Хуки для работы с формами
import { useNavigate } from "react-router-dom"; // Хук для навигации между страницами

// Определяем интерфейс для формы регистрации
interface IRegistrationPage {
  useremail: string;
  userpassword: string;
  userlastname: string;
  usercity: string;
  userphone: string;
  username: string;
}

// Создаем схему валидации с помощью yup
const regFormSchema = yup.object({
  useremail: yup
    .string()
    .required("Обязательное поле") // Почта обязательна для заполнения
    .email("Введите почту в правильном формате"), // Почта должна быть в правильном формате
  userpassword: yup
    .string()
    .required("Обязательное поле") // Пароль обязательное поле
    .min(8, "Минимум 8 символов"), // Пароль не менее 8 символов
  username: yup
    .string()
    .required("Обязательное поле") // Имя обязательно для заполнения
    .min(3, "Имя может быть минимум 3 буквы"), // Имя должно содержать минимум 3 буквы
  userlastname: yup
    .string()
    .required("Обязательное поле") // Фамилия обязательна для заполнения
    .min(5, "Фамилия может быть минимум 5 букв"), // Фамилия должна быть минимум 5 букв
  usercity: yup
    .string()
    .required("Обязательное поле") // Город обязательное поле
    .min(5, "Название города может быть минимум 5 букв"), // Город должен быть не менее 5 символов
  userphone: yup
    .string()
    .required("Обязательное поле") // Телефон обязательное поле
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, "Неверный формат телефона") // Формат телефона должен быть правильным
    .min(13, "Номер телефона должен быть похож на +998(XX)XXXXXXX"), // Телефон должен быть в нужном формате
});

// Основной компонент страницы регистрации
export const RegistrationPage = () => {
  // Используем хук useForm для работы с формой
  const {
    control, // Контроллер для полей формы
    handleSubmit, // Функция для обработки отправки формы
    formState: { errors }, // Обработчик ошибок
  } = useForm<IRegistrationPage>({
    resolver: yupResolver(regFormSchema), // Подключаем схему валидации
    defaultValues: {
      useremail: "",
      userpassword: "",
      userphone: "",
      usercity: "",
      userlastname: "",
      username: "",
    },
  });

  const navigate = useNavigate(); // Хук для перехода на другие страницы

  // Функция, которая выполняется при успешной отправке формы
  const onSubmit: SubmitHandler<IRegistrationPage> = (data) => {
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem("user", JSON.stringify(data));
    console.log("Данные сохранены в localStorage:", data);

    // Переходим на страницу профиля
    navigate("/");
  };

  return (
    <>
      <Heading text="Регистрация " /> {/* Заголовок страницы */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* Форма с обработчиком отправки данных */}
        {/* Поле для ввода имени */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.username} // Проверка на ошибку в поле имени
              errorMessage={errors.username?.message} // Сообщение об ошибке
              type="text"
              placeholder="Имя" // Текст-подсказка
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Поле для ввода фамилии */}
        <Controller
          name="userlastname"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.userlastname} // Проверка на ошибку в поле фамилии
              errorMessage={errors.userlastname?.message} // Сообщение об ошибке
              type="text"
              placeholder="Введите фамилию" // Текст-подсказка
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Поле для ввода города */}
        <Controller
          name="usercity"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.usercity} // Проверка на ошибку в поле города
              errorMessage={errors.usercity?.message} // Сообщение об ошибке
              type="text"
              placeholder="Введите название вашего города" // Текст-подсказка
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Поле для ввода email */}
        <Controller
          name="useremail"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.useremail} // Проверка на ошибку в поле почты
              errorMessage={errors.useremail?.message} // Сообщение об ошибке
              type="email"
              placeholder="Введите email" // Текст-подсказка
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Поле для ввода номера телефона */}
        <Controller
          name="userphone"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.userphone} // Проверка на ошибку в поле телефона
              errorMessage={errors.userphone?.message} // Сообщение об ошибке
              type="tel"
              placeholder="+998(XX)XXXXXXX" // Текст-подсказка для формата номера телефона
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Поле для ввода пароля */}
        <Controller
          name="userpassword"
          control={control}
          render={({ field }) => (
            <Input
              isError={!!errors.userpassword} // Проверка на ошибку в поле пароля
              errorMessage={errors.userpassword?.message} // Сообщение об ошибке
              type="password"
              placeholder="Пароль" // Текст-подсказка
              {...field} // Передаем все необходимые свойства из useForm
            />
          )}
        />
        {/* Кнопка для отправки формы */}
        <Button type="submit" text="Зарегистрироваться" />
      </form>
    </>
  );
};
