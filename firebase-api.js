export const productsAPI = {
    // get all products
    async getAllProducts() {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  
    // single product
    async getProduct(id) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },
  
    // featured products
    async getFeaturedProducts() {
      const q = query(collection(db, "products"), where("featured", "==", true));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  
    // new product (admin only)
    async addProduct(productData) {
      const docRef = doc(collection(db, "products"));
      await setDoc(docRef, {
        ...productData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return docRef.id;
    }
  };
  
  export const userAPI = {
    async register(email, password, userData) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        ...userData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      return userCredential.user;
    },
  

    async login(email, password) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", userCredential.user.uid), {
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      return userCredential.user;
    },
  
    async getCurrentUser() {
      const user = auth.currentUser;
      if (!user) return null;
      
      const docSnap = await getDoc(doc(db, "users", user.uid));
      return docSnap.exists() ? { uid: user.uid, ...docSnap.data() } : null;
    }
  };
  
  // Cart API
  export const cartAPI = {
    // Add to cart
    async addToCart(userId, productId, quantity = 1) {
      const cartRef = doc(db, "users", userId, "cart", productId);
      await setDoc(cartRef, {
        productId,
        quantity,
        addedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    },
  
    // Get user cart
    async getCart(userId) {
      const q = query(collection(db, "users", userId, "cart"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  
    // Remove from cart
    async removeFromCart(userId, productId) {
      await deleteDoc(doc(db, "users", userId, "cart", productId));
    }
  };
  
  // Order API
  export const orderAPI = {
    // Create new order
    async createOrder(orderData) {
      const orderRef = doc(collection(db, "orders"));
      await setDoc(orderRef, {
        ...orderData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: "processing"
      });
      return orderRef.id;
    },
  
    // Get user orders
    async getUserOrders(userId) {
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  };
  
  // Storage API for product images
  export const storageAPI = {
    async uploadProductImage(file, productId) {
      const storageRef = ref(storage, `products/${productId}/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    }
  };