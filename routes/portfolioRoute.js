import express from 'express';
const router = express.Router();
import * as C from "../controllers/portfolioController.js";
import auth from "../middleware/auth.js";

router.get( "/get-portfolio-data", C.GetPortfolioData );

// Update intro
router.post( "/update-intro", auth, C.PortfolioIntroUpdate );

// Update about
router.post( "/update-about", auth, C.PortfolioAboutUpdate );

// Add experience
router.post( "/add-experience", auth, C.PortfolioExperienceAdd );

// Delete experience
router.post( "/delete-experience", auth, C.PortfolioExperienceDelete );

// Update experience
router.post( "/update-experience", auth, C.PortfolioExperienceUpdate );

// Add project
router.post( "/add-project", auth, C.PortfolioProjectAdd );

// Delete project
router.post( "/delete-project", auth, C.PortfolioProjectDelete );

// Update project
router.post( "/update-project", auth, C.PortfolioProjectUpdate );

// Add education
router.post( "/add-education", auth, C.PortfolioEducationAdd );

// Delete education
router.post( "/delete-education", auth, C.PortfolioEducationDelete );

// Update education
router.post( "/update-education", auth, C.PortfolioEducationUpdate );

// Update contact info
router.post( "/update-contact", auth, C.PortfolioContactUpdate );

// Send message
router.post( "/send-message", C.SendMessage );

// Edit / Update message
router.post( "/edit-message", auth, C.EditMessage );

// Delete message
router.post( "/delete-message", auth, C.DeleteMessage );

// Admin login
// router.post("/login", auth, C.FunctionName );

export default router;