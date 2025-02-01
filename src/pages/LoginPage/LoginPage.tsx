import "./LoginPage.scss";
import { Button } from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import { AppLink, AuthWith } from "../../components/"; // Импортируем компоненты для ссылок и авторизации
import { Heading } from "../../components/typography/Heading";
import { useNavigate } from "react-router-dom"; // Хук для навигации между страницами
import * as yup from "yup"; // Библиотека для валидации форм
import { Controller, SubmitHandler, useForm } from "react-hook-form"; // Хук для работы с формами
import { yupResolver } from "@hookform/resolvers/yup"; // Подключаем интеграцию с yup для валидации

// Определяем интерфейс для данных, которые будут отправляться через форму
interface ILoginPage {
  useremail: string;
  userpassword: string;
}

// Создаем схему валидации для формы с использованием библиотеки yup
const loginFormSchema = yup.object({
  useremail: yup
    .string()
    .required("Обязательное поле") // Почта обязательна для заполнения
    .email("Введите почту в правильном формате"), // Проверяем правильность почты
  userpassword: yup
    .string()
    .required("Обязательное поле") // Пароль обязателен
    .min(8, "Минимум 8 символов"), // Пароль должен быть не менее 8 символов
});

// Основной компонент страницы входа
export const LoginPage = () => {
  // Используем хук для работы с формой и валидацией
  const {
    control, // Контроллер для управления состоянием полей формы
    handleSubmit, // Функция для отправки данных формы
    formState: { errors }, // Ошибки формы
  } = useForm({
    resolver: yupResolver(loginFormSchema), // Связываем yup с react-hook-form для валидации
    defaultValues: { useremail: "", userpassword: "" }, // Начальные значения для формы
  });

  const navigate = useNavigate(); // Хук для навигации на другие страницы

  // Функция, которая вызывается при отправке формы
  const onSubmit: SubmitHandler<ILoginPage> = (data) => {
    // Извлекаем данные пользователя из localStorage
    const storedUser = localStorage.getItem("user");

    // Проверяем, есть ли пользователь в localStorage
    if (storedUser) {
      const user = JSON.parse(storedUser); // Преобразуем строку в объект

      // Сравниваем введенные данные с данными из localStorage
      if (
        user.useremail === data.useremail && // Сравниваем email
        user.userpassword === data.userpassword // Сравниваем пароль
      ) {
        console.log("Авторизация успешна"); // Успешная авторизация
        navigate("/main"); // Переходим на страницу main после успешного входа
      } else {
        console.log("Неверный email или пароль"); // Ошибка, если данные не совпадают
        // Здесь можно добавить логику для отображения сообщения об ошибке
      }
    } else {
      console.log("Пользователь не найден"); // Если пользователя нет в localStorage
    }
    useNavigate("/");
  };

  return (
    <div className="LoginPage">
      <Heading text="Авторизация " /> {/* Заголовок страницы */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* Форма с обработчиком отправки данных */}
        {/* Поле для ввода почты */}
        <Controller
          name="useremail" // Имя поля
          control={control} // Подключаем управление состоянием поля через react-hook-form
          render={(
            { field } // Рендерим поле с помощью Input компонента
          ) => (
            <Input
              isError={errors.useremail ? true : false} // Если есть ошибка, передаем true
              errorMessage={errors.useremail?.message} // Сообщение об ошибке
              type="text"
              placeholder="Эл.почта" // Текст-подсказка в поле
              {...field} // Передаем все остальные поля из useForm
            />
          )}
        />
        {/* Поле для ввода пароля */}
        <Controller
          name="userpassword" // Имя поля
          control={control} // Подключаем управление состоянием поля через react-hook-form
          render={(
            { field } // Рендерим поле с помощью Input компонента
          ) => (
            <Input
              isError={errors.userpassword ? true : false} // Если есть ошибка, передаем true
              errorMessage={errors.userpassword?.message} // Сообщение об ошибке
              type="password" // Тип поля для пароля
              placeholder="Пароль" // Текст-подсказка в поле
              {...field} // Передаем все остальные поля из useForm
            />
          )}
        />
        <Button type="submit" text={"Войти"} />{" "}
        {/* Кнопка для отправки формы */}
      </form>
      <AppLink text="Забыли пароль?" href="" />{" "}
      {/* Ссылка для восстановления пароля */}
      <AuthWith />{" "}
      {/* Компонент для альтернативных методов авторизации (например, через соцсети) */}
    </div>
  );
};
