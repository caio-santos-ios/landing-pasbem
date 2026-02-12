// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          200: '#c7d2fe', // Cor das bordas que você usou nos inputs
          500: '#3b82f6', // Azul principal
          600: '#2563eb', // Botões (variant secondary/primary)
          900: '#1e3a8a',
        },
      },
      backgroundImage: {
        'gradient-pasbem': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      }
    },
  },
}