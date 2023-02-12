import styles from "./Partners-Program.module.css";
import { Button } from "antd";
import AffilateImage from "assets/images/affiliate-image.png";
import { useNavigate } from "react-router-dom";

const PartnersProgram = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles["partner-program"]} container`}>
      <div className={styles["main"]}>
        <h2 className={styles["title"]}>Становись партнёром</h2>
        <img src={AffilateImage} alt={"Декоративное изображение для партнёрской программы"} style={{ width: "100%" }} />
        <p className={styles["subtitle"]}>
          Присоединяйтесь к партнёрской программе Trust Investment и зарабатывайте до 7% за каждый депозит привёденного
          вами человека.
        </p>
        <Button
          type={"primary"}
          className={styles["register-button"]}
          onClick={() => {
            navigate("/register");
          }}
        >
          Зарегистрироваться и начать зарабывать
        </Button>
        {/*</div>*/}
      </div>
      <div className={styles["program-description"]}>
        <p>
          <span>Что это?</span>
          Компания Trust Investment постоянно развивается и принимает инновационные решения, которые положительно
          отражаются на всех инвесторах. Специально для наших клиентов компания Trust Investment разработала
          многоуровневую реферальную программу. Принять участие в данной программе может абсолютно каждый, кто прошел
          регистрацию на нашей онлайн платформе. После регистрации хватит всего пару кликов мышкой, что бы начать
          делится с друзьями реферальной ссылкой и зарабатывать приятные бонусы от открытых вкладов приведенными вами
          людей.
        </p>
        <p>
          <span>Как начать?</span>
          Персональная реферальная ссылка находится в вашем личном кабинете. Делитесь этой ссылкой со своими друзьями
          или единомышленниками и вскоре после того, как приглашенный вами участник сделает первый депозит, вы получите
          вознаграждение на свой баланс. Самое примечательное в этом то, что программа многоуровневая, а это значит то,
          что вы будете получать прибыль даже с тех людей кого пригласили приглашенные вами участники. Процентная ставка
          от депозита привлеченных вами партнеров: <b>7% - 4% - 3% - 2% - 1%</b>
        </p>
      </div>
      <div className={styles["how-to-work"]}>
        <h3 className={styles["how-to-work__title"]}>Как это работает?</h3>
        <div className={styles["how-to-work-wrapper"]}>
          <div className={styles["how-to-work__item"]}>
            <span>1</span>
            <div>
              <h3>Старт</h3>
              <p>
                Если у вас есть свой блог, вебсайт или вы покупаете рекламу, вы можете там разместить свою реферальную
                ссылку
              </p>
            </div>
          </div>
          <div className={styles["how-to-work__item"]}>
            <span>2</span>
            <div>
              <h3 className={styles["how-to-work__title"]}>Ваша ссылка</h3>
              <p>
                Когда пользователь переходит по вашей ссылке, мы помечаем пользователя вашим уникальным ID для будущих
                начислений
              </p>
            </div>
          </div>
          <div className={styles["how-to-work__item"]}>
            <span>3</span>
            <div>
              <h3>Регистрация реферала</h3>
              <p>Пользователь (реферал) регистрируется в нашей компании и начинает пользоваться её услугами</p>
            </div>
          </div>
          <div className={styles["how-to-work__item"]}>
            <span>4</span>
            <div>
              <h3>Начисление дохода</h3>
              <p>Сразу же, после регистрация в партнёрской программе ваше вознаграждение будет 7%</p>
            </div>
          </div>
          <div className={styles["how-to-work__item"]}>
            <span>5</span>
            <div>
              <h3>Выплата</h3>
              <p>В любой момент вы можете получить свою прибыль заработанную с помощью партнёрской программы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PartnersProgram };
