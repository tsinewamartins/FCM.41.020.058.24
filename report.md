# Examination Project Report: VR Villa Development
**Course:** IS273 (Computer Graphics)  
**Student Name:** Christabel Essuman  
**Index Number:** FCM.41.020.058.24  
**Department:** Information Systems  

---

## 1. Project Overview
In this project, I developed a high-fidelity 3D virtual environment—a modern villa—using the A-Frame framework. My goal was to create an immersive, realistic experience that pushes the boundaries of web-based VR while maintaining smooth performance across devices. The scene features a furnished house, a functional swimming pool with custom shaders, a luxury vehicle, and a beautifully lit environment.

## 2. Design Choices
My design philosophy for this villa was "Modern Minimalism." Key choices included:
- **Spatial Layout**: I wanted an open-plan feeling. I positioned the house centrally, surrounded by a large perimeter wall to give a sense of privacy and "enclosure" within the 3D world.
- **Lighting Dynamics**: I used a combination of **Ambient Lighting** for general visibility and a **Directional Light** precisely positioned to create realistic reflections on the pool surface. I also added a **Point Light** near the pool to create intimacy in the outdoor area.
- **Visual WOW Factor**: Instead of relying solely on textures, I implemented a **Custom GLSL Shader** for the pool water. This adds a dynamic ripple and caustic effect that changes over time, making the scene feel "alive" rather than static.

## 3. Technical Hurdles & Solutions
The development journey was not without challenges. Here is how I overcame them:

### A. Performance Optimization (The 110MB House Model)
One of the biggest hurdles was the sheer size of the main villa model, which exceeded 110MB. 
- **The Issue**: Initially, this caused massive frame drops and long loading times on mid-range devices.
- **The Solution**: I optimized the scene graph and refined the scaling of the environmental assets (sky, floor) to reduce the drawing calls required by the GPU. I also transitioned to a more efficient movement system to ensure the user didn't experience "motion sickness" from lag.

### B. Input Latency & Movement
Simple WASD controls felt sluggish when the scene became complex. 
- **The Solution**: I integrated the `aframe-extras` movement-controls system, which handles physics and input more smoothly. I enabled "fly" mode for this prototype to allow users to explore both the interior and exterior from any height.

### C. Scaling Cohesion
Mixing models from different sources often leads to scaling issues (e.g., a chair being larger than a car).
- **The Solution**: I spent significant time calibrating the relative scales (House: 10x, Bed: 30x, Sofa: 15x) to ensure a realistic human-centered perspective.

## 4. Asset Management: URL vs. Asset System
A specific choice in my code was using `gltf-model="url(...)"` for several models instead of the standard `<a-assets>` management system.

**Why I made this choice:**
1.  **Bypassing the Loading Bottleneck**: The `<a-assets>` system is a "blocking" system. A-Frame will not render any part of the scene until every asset in that block is downloaded. Because my house model was 110MB, the user would have seen a blank screen for a long time. By using the `url()` attribute, I allowed the browser to show the sky, floor, and lighting **immediately**, with the house model loading in the background. This significantly improves the **Perceived Performance**.
2.  **Tool Compatibility**: During development, I used the `a-frame-watcher`. This tool works by writing attribute updates directly to the HTML. Using `url()` makes it easier for the watcher and the A-Frame Inspector to track and modify asset paths in real-time without having to map back to an ID in the assets block.

## 5. Future Fixes & Features
While the current scene is a complete environment, I plan to implement the following in the next iteration:
- **Interactivity**: Adding event listeners to doors to allow them to open upon being "fused" with the cursor.
- **Physics Collision**: Currently, users can "fly" through walls. I plan to add `static-body` components to every wall and piece of furniture for a more grounded "walking" experience.
- **Dynamic Day/Night Cycle**: Implementing a script to change the sky texture and light intensity based on time.

---
*Submitted as part of the IS273 Computer Graphics course requirements.*
