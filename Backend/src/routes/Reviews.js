import express from "express";
const router = express.Router();

import reviewsController from "../controllers/reviewsController.js";

router.route("/")
.get(reviewsController.getReviews)
.post(reviewsController.createReview);

router
  .route("/:id")
  .get(reviewsController.getReview)
  .put(reviewsController.updateReviews)
  .delete(reviewsController.deleteReviews);

export default router;