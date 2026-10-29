

// export const authorize = (...allowedRoles) => {
//   return (req, res, next) => {
//     console.log("Request URL:", req.originalUrl);
//     console.log("Decoded role:", req.user?.role);
//     console.log("Allowed roles:", allowedRoles);

//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized",
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. you don't have permission.",
//       });
//     }

//     next();
//   };
// };



import {
  UnauthorizedError,
  ForbiddenError,
} from "../Utils/error.js";

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    console.log("Decoded role:", req.user?.role);
    console.log("Allowed roles:", allowedRoles);

    // Authentication check
    if (!req.user) {
      return next(
        new UnauthorizedError("Not authorized")
      );
    }

    // Role authorization check
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          "Access denied. You don't have permission."
        )
      );
    }

    next();
  };
};
