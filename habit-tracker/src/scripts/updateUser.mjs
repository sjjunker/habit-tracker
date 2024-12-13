import { getAuth, updatePassword, updateEmail, updateProfile } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

//Update user's first and last names
updateProfile(auth.currentUser, {
    displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
    // Profile updated!
    // ...
}).catch((error) => {
    // An error occurred
    // ...
});


//Update email
updateEmail(auth.currentUser, "user@example.com").then(() => {
    // Email updated!
    // ...
}).catch((error) => {
    // An error occurred
    // ...
});


//Update password
const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword).then(() => {
    // Update successful.
}).catch((error) => {
    // An error ocurred
    // ...
});