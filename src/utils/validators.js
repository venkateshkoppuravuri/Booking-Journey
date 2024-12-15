export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };
  
  export const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (!phone) {
      return "Phone number is required";
    }
    if (cleanPhone.length !== 10) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  };
  
  export const validateName = (name) => {
    if (!name) {
      return "Name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters long";
    }
    return "";
  };
  