// assets
import defaultPic from "../../assets/icons/profile.png";

// types
import { Profile } from "../../types/models";

// css
import styles from "./ProfileCard.module.css";

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const { profile } = props;

  const profilePic = profile.photo ? profile.photo : defaultPic;

  return (
    <article className={styles.article}>
      <img
        src={profilePic}
        alt={`${profile.name}'s avatar`}
        className={styles.profile}
      />
      <h1>{profile.name}</h1>
    </article>
  );
};

export default ProfileCard;
