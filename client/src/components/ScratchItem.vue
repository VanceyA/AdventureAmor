  <template>
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <p>Price: ${{ item.price }}</p>
        <p>Time: {{ item.length }}</p>
      </div>
  
      <div class="relative w-60 h-56 p-4 border rounded-lg shadow-lg bg-white">
        <img src="/test_image.jpg" alt="Challenge Image" class="w-full h-full object-cover rounded-lg" />

        <canvas
          ref="scratchCanvas"
          class="absolute inset-0 cursor-pointer z-10 rounded-lg"
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

      </div>
  
      <h3 class="text-xl font-semibold text-center mt-2">{{ item.name }}</h3>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const props = defineProps({
    item: Object,
    isModalOpen: Boolean
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
    if (!props.isModalOpen) return; 
    event.preventDefault();
    console.log('Scratch started');

    const ctx = scratchCanvas.value.getContext('2d');
    
    const rect = scratchCanvas.value.getBoundingClientRect();

    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    const offsetX = clientX - rect.left + window.scrollX;
    const offsetY = clientY - rect.top + window.scrollY;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const scratchEffect = (event) => {
    if (!props.isModalOpen) return;
    if (!scratchCanvas.value) return;
    const ctx = scratchCanvas.value.getContext('2d');
    const rect = scratchCanvas.value.getBoundingClientRect();

    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    const offsetX = clientX - rect.left; 
    const offsetY = clientY - rect.top;


    ctx.lineTo(offsetX, offsetY); 
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';  
    ctx.lineWidth = 40; 
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'destination-out';
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
      const alpha = pixelData[i + 3];  
      if (alpha < 255) {
        scratchedArea++; 
      }
    }


    const totalPixels = canvasWidth * canvasHeight; 
    const threshold = totalPixels * 0.8;
    if (scratchedArea > threshold) {
      scratched.value = true; 
      console.log("Scratch complete!"); 
      clearRemainingGray();
    }
  };

  const clearRemainingGray = () => {
    const canvas = scratchCanvas.value;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; 
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);  
  };

  const endScratch = () => {
      window.removeEventListener('mousemove', scratchEffect);
      window.removeEventListener('touchmove', scratchEffect);
  };
</script>
  

