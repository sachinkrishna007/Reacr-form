import * as Yup from "yup";

export const mobileRegex = /^\d{10}$/;

export const validationSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  idNumber: Yup.string()
    .required("ID Number is required")
    .test("idNumber-format", function (value) {
      const { country } = this.parent;
      if (!value) return false;

      if (country === "India") {
        const aadhaarRegex = /^\d{12}$/;
        if (!aadhaarRegex.test(value)) {
          return this.createError({
            message: "Aadhaar must be exactly 12 digits",
          });
        }
      } else if (country === "UAE") {
        const emiratiIdRegex = /^\d{3}-\d{4}-\d{7}-\d{1}$/;
        if (!emiratiIdRegex.test(value)) {
          return this.createError({
            message: "Emirates ID must be in format 000-0000-0000000-0",
          });
        }
      } else if (country === "USA") {
        const ssnRegex = /^\d{9}$/;
        if (!ssnRegex.test(value)) {
          return this.createError({
            message: "SSN must be exactly 9 digits",
          });
        }
      }
      return true;
    }),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string()
    .matches(mobileRegex, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});