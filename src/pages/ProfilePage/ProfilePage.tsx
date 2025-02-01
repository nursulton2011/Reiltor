import React, { useRef, useEffect, useState } from "react";
import { Heading } from "../../components/typography/Heading";
import { Input } from "../../components/UI/index";
import styles from "./ProfilePage.module.css"; // Импортируем CSS

interface IUser {
  username: string;
  userlastname: string;
  usercity: string;
  useremail: string;
  userpassword: string;
  userphone: string;
}

export const ProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    "/img/profile/Без названия.png"
  );
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение");
        return;
      }
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
    }
  };

  if (!user) {
    return (
      <Heading level="6">
        Нет данных o пользователе. Пожалуйста, зарегистрируйтесь.
      </Heading>
    );
  }

  return (
    <div className={styles["profile-container"]}>
      <img
        src={imageSrc}
        alt="Нажмите, чтобы выбрать изображение"
        className={styles["profile-image"]}
        onClick={handleImageClick}
      />
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className={styles["file-input"]}
        onChange={handleFileChange}
      />
      <div className={styles["profile-info"]}>
        <Heading
          text={`Имя: ${user.username}`}
          level="2"
          className={styles["profile-heading"]}
        />
        <Heading
          text={`Фамилия: ${user.userlastname}`}
          level="2"
          className={styles["profile-heading"]}
        />
        <Heading
          text={`Город проживания: ${user.usercity}`}
          level="2"
          className={styles["profile-heading"]}
        />
        <Heading
          text={`Эл. почта: ${user.useremail}`}
          level="2"
          className={styles["profile-heading"]}
        />
        <Heading
          text={`Номер телефона: ${user.userphone}`}
          level="2"
          className={styles["profile-heading"]}
        />
        <div className={styles["password-container"]}>
          <Heading text="Пароль: " level="2" />
          <Input
            type="password"
            value={user.userpassword}
            disabled
            className={styles["password-input"]}
          />
        </div>
      </div>
    </div>
  );
};
