<!-- <template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-between">
            <p>Price: ${{ item.price }}</p>
            <p>Time: {{ item.length }}</p>
        </div>
        <div class="relative w-60 h-56 p-4 border rounded-lg shadow-lg bg-white"></div>
        <h3 class="text-xl font-semibold text-center">{{ item.name }}</h3>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Define the prop that will be passed from the parent
  const props = defineProps({
    item: Object
  });
  </script> -->

  <template>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <p>Price: ${{ item.price }}</p>
        <p>Time: {{ item.length }}</p>
      </div>
  
      <div class="relative w-60 h-56 p-4 border rounded-lg shadow-lg bg-white">
        <canvas
          ref="scratchCanvas"
          class="absolute inset-0 bg-gray-500 cursor-pointer z-10 rounded-lg"
          :width="canvasWidth"
          :height="canvasHeight"
          @mousedown="startScratch"
          @mousemove="scratchEffect"
          @mouseup="endScratch"
          @touchstart="startScratch"
          @touchmove="scratchEffect"
          @touchend="endScratch"
        ></canvas>
  

        <div v-if="!scratched" class="absolute inset-0 flex items-center justify-center z-20 text-white text-xl font-bold pointer-events-none">
            Scratch Me!
        </div>

        <div v-if="scratched" class="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 bg-white">
          <img src="/test_image.jpg" alt="Challenge Image" class="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
  
      <h3 class="text-xl font-semibold text-center mt-2">{{ item.name }}</h3>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    item: Object
  });
  
  const scratched = ref(false); 
  const scratchCanvas = ref(null); 
  const canvasWidth = 240; 
  const canvasHeight = 224; 
  
  onMounted(() => {
    const canvas = scratchCanvas.value;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'gray'; 
    ctx.fillRect(0, 0, canvasWidth, canvasHeight); 
  });
  
  const startScratch = (event) => {
  event.preventDefault();
  console.log('Scratch started');

  const ctx = scratchCanvas.value.getContext('2d');
  
  // Get the canvas position relative to the viewport
  const rect = scratchCanvas.value.getBoundingClientRect();

  const { clientX, clientY } = event.touches ? event.touches[0] : event;

  // Adjust for the scroll position (consider page scroll)
  const offsetX = clientX - rect.left + window.scrollX;
  const offsetY = clientY - rect.top + window.scrollY;

  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
  };

const scratchEffect = (event) => {
  if (!scratchCanvas.value) return;
  const ctx = scratchCanvas.value.getContext('2d');

  const rect = scratchCanvas.value.getBoundingClientRect();

  const { clientX, clientY } = event.touches ? event.touches[0] : event;

  const offsetX = clientX - rect.left + window.scrollX;
  const offsetY = clientY - rect.top + window.scrollY;

//   console.log(`Scratching at: X: ${offsetX}, Y: ${offsetY}`); 

  ctx.lineTo(offsetX, offsetY); 
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)'; 
  ctx.lineWidth = 40; 
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  checkScratch(); 
};

  
const checkScratch = () => {
  const canvas = scratchCanvas.value;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const pixelData = imageData.data;
  let scratchedArea = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];       
    const g = pixelData[i + 1];  
    const b = pixelData[i + 2];   

    if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10 && r < 100) {
      scratchedArea++;
    }
  }

//   console.log("Scratched Area: ", scratchedArea);

  const threshold = 1000; 
  if (scratchedArea > threshold) {
    scratched.value = true; 
    console.log("Scratch complete!"); 
  }
};

  
  const endScratch = () => {
    window.removeEventListener('mousemove', scratchEffect);
    window.removeEventListener('touchmove', scratchEffect);
  };
  </script>
  

