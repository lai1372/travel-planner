'use client'

import styles from "../page.module.css";
import DeleteAccount from "../firebase/profile/deleteAccount";

export default function ProfileSettings() {
  
  const handleDelete = () => {
    DeleteAccount('005cAObhZ6R7207OClgUB1qYYfC2')
  }
  
  
  
  
  return (
    <>
      <h1>Profile Settings for x</h1>
      <img
        className={styles.img}
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
      /><br></br>
      <button>Edit avatar</button>
      <p>Name: x <button>Edit name</button></p>
      
      <button>Change password</button>

      <button className={styles.delete} onClick={handleDelete}>Delete account</button>
    </>
  );
}
