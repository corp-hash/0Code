const { callAIAgent } = require('../services/aiService');
const Website = require('../models/Website');

const generateWebsite = async (req, res, next) => {
  try {
    const { name, businessName, businessModel, colorScheme, contactEmail, contactPhone, additionalFeatures } = req.body;
    
    // Call AI agent to generate website code
    const aiResponse = await callAIAgent({
      prompt: `Generate a complete website code for ${businessName} with the following specifications:
      - Business model: ${businessModel}
      - Color scheme: ${colorScheme}
      - Contact email: ${contactEmail}
      - Contact phone: ${contactPhone}
      - Additional features: ${additionalFeatures.join(', ')}
      
      The website should be responsive, modern, and include all necessary pages for the business model.
      Include HTML, CSS, JavaScript, and any necessary backend code in Node.js.
      `,
      maxTokens: 4000
    });
    
    // Save to database
    const website = await Website.create({
      user: req.user.id,
      name: businessName,
      code: aiResponse.code,
      preferences: req.body,
      status: 'generated'
    });
    
    res.status(200).json({
      success: true,
      code: aiResponse.code,
      websiteId: website._id
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = { generateWebsite };