// Convenience re-export so imports like '../firebase' resolve.
import { storage, db, rtdb, auth } from "./components/firebase";

export { storage, db, rtdb, auth };

const firebaseExports = { storage, db, rtdb, auth };
export default firebaseExports;
