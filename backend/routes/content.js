const express = require("express");
const router = express.Router();
const { insertContent, loadContent } = require("../database");
const { authenticateToken } = require("../middleware/auth");
const multer = require("multer");

// Configure multer for handling multipart/form-data in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    fieldSize: 50 * 1024 * 1024, // 50MB field size limit
  },
});

// Create content (protected route) - accepts multipart/form-data
router.post("/save", authenticateToken, upload.none(), async (req, res) => {
  const { user_id, mdxContent, fabricContent } = req.body;

  // At least one content field should have data
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

 await insertContent({ 
    user_id, 
    mdxContent: mdxContent || null, 
    fabricContent: fabricContent || null 
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to create content" });
    });
});

router.get("/load/:user_id", authenticateToken, async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Load content for the user
    await loadContent(user_id)
        .then((content) => {
            res.status(200).json(content);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Failed to load content" });
        });
});

module.exports = router;
