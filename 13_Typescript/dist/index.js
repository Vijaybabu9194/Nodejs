"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = `${process.env.PORT || 3001}`;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    var _a, _b, _c, _d;
    const a = {};
    console.log((_d = (_c = (_b = (_a = a === null || a === void 0 ? void 0 : a.d) === null || _a === void 0 ? void 0 : _a.b) === null || _b === void 0 ? void 0 : _b.d) === null || _c === void 0 ? void 0 : _c.e) === null || _d === void 0 ? void 0 : _d.d);
    res.json({
        message: "Welcome to the API",
        status: "success"
    });
});
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
