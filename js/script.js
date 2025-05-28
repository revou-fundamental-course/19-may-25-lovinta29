       class TemperatureConverter {
            constructor() {
                this.currentMode = 'celsius'; // 'celsius' or 'fahrenheit'
                this.initializeElements();
                this.bindEvents();
                this.setupInitialState();
            }

            initializeElements() {
                this.form = document.getElementById('temperatureForm');
                this.celsiusInput = document.getElementById('celsiusInput');
                this.fahrenheitOutput = document.getElementById('fahrenheitOutput');
                this.convertBtn = document.querySelector('.btn-convert');
                this.resetBtn = document.getElementById('resetBtn');
                this.reverseBtn = document.getElementById('reverseBtn');
                this.calculationDisplay = document.getElementById('calculationDisplay');
                this.calculationFormula = document.getElementById('calculationFormula');
                this.explanationTitle = document.getElementById('explanationTitle');
                this.explanationContent = document.getElementById('explanationContent');
                this.celsiusError = document.getElementById('celsiusError');
                this.fahrenheitError = document.getElementById('fahrenheitError');
            }

            bindEvents() {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                this.resetBtn.addEventListener('click', () => this.resetForm());
                this.reverseBtn.addEventListener('click', () => this.reverseConversion());
                
                // Real-time input validation
                this.celsiusInput.addEventListener('input', () => this.clearError('celsius'));
                this.fahrenheitOutput.addEventListener('input', () => this.clearError('fahrenheit'));
            }

            setupInitialState() {
                this.updateInterface();
                this.calculationDisplay.style.display = 'none';
            }

            handleSubmit(e) {
                e.preventDefault();
                
                if (this.currentMode === 'celsius') {
                    this.convertFromCelsius();
                } else {
                    this.convertFromFahrenheit();
                }
            }

            convertFromCelsius() {
                const celsiusValue = parseFloat(this.celsiusInput.value);
                
                if (!this.validateInput(celsiusValue, 'celsius')) {
                    return;
                }

                const fahrenheitValue = (celsiusValue * 9/5) + 32;
                const roundedFahrenheit = Math.round(fahrenheitValue * 100) / 100;
                
                this.fahrenheitOutput.value = roundedFahrenheit;
                this.showCalculation(celsiusValue, roundedFahrenheit, 'celsius');
                this.animateResult();
            }

            convertFromFahrenheit() {
                const fahrenheitValue = parseFloat(this.fahrenheitOutput.value);
                
                if (!this.validateInput(fahrenheitValue, 'fahrenheit')) {
                    return;
                }

                const celsiusValue = (fahrenheitValue - 32) * 5/9;
                const roundedCelsius = Math.round(celsiusValue * 100) / 100;
                
                this.celsiusInput.value = roundedCelsius;
                this.showCalculation(fahrenheitValue, roundedCelsius, 'fahrenheit');
                this.animateResult();
            }

            validateInput(value, type) {
                const isValid = !isNaN(value) && isFinite(value);
                
                if (!isValid) {
                    this.showError(type);
                    return false;
                }
                
                this.clearError(type);
                return true;
            }

            showError(type) {
                if (type === 'celsius') {
                    this.celsiusInput.classList.add('error');
                    this.celsiusError.classList.add('show');
                } else {
                    this.fahrenheitOutput.classList.add('error');
                    this.fahrenheitError.classList.add('show');
                }
            }

            clearError(type) {
                if (type === 'celsius') {
                    this.celsiusInput.classList.remove('error');
                    this.celsiusError.classList.remove('show');
                } else {
                    this.fahrenheitOutput.classList.remove('error');
                    this.fahrenheitError.classList.remove('show');
                }
            }

            showCalculation(inputValue, outputValue, conversionType) {
                let formula;
                
                if (conversionType === 'celsius') {
                    formula = `${inputValue}°C × (9/5) + 32 = ${outputValue}°F`;
                } else {
                    formula = `(${inputValue}°F - 32) × (5/9) = ${outputValue}°C`;
                }
                
                this.calculationFormula.textContent = formula;
                this.calculationDisplay.style.display = 'block';
                this.calculationDisplay.classList.add('show');
            }

            animateResult() {
                // Add pulse animation to result
                const outputField = this.currentMode === 'celsius' ? this.fahrenheitOutput : this.celsiusInput;
                outputField.style.transform = 'scale(1.05)';
                outputField.style.boxShadow = '0 0 20px rgba(116, 185, 255, 0.6)';
                
                setTimeout(() => {
                    outputField.style.transform = 'scale(1)';
                    outputField.style.boxShadow = 'none';
                }, 300);
            }

            resetForm() {
                this.celsiusInput.value = '';
                this.fahrenheitOutput.value = '';
                this.calculationDisplay.classList.remove('show');
                this.clearError('celsius');
                this.clearError('fahrenheit');
                
                setTimeout(() => {
                    this.calculationDisplay.style.display = 'none';
                }, 500);
                
                // Add reset animation
                this.form.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.form.style.transform = 'scale(1)';
                }, 200);
            }

            reverseConversion() {
                this.currentMode = this.currentMode === 'celsius' ? 'fahrenheit' : 'celsius';
                this.updateInterface();
                this.resetForm();
            }

            updateInterface() {
                const inputSection = document.querySelector('.input-section');
                const outputSection = document.querySelector('.output-section');
                const inputLabel = document.querySelector('.input-label');
                
                if (this.currentMode === 'celsius') {
                    // Celsius to Fahrenheit mode
                    this.celsiusInput.readOnly = false;
                    this.fahrenheitOutput.readOnly = true;
                    this.celsiusInput.classList.remove('temperature-output');
                    this.celsiusInput.classList.add('temperature-input');
                    this.fahrenheitOutput.classList.remove('temperature-input');
                    this.fahrenheitOutput.classList.add('temperature-output');
                    
                    inputLabel.textContent = 'Masukkan suhu derajat Celsius (°C) ke kotak dibawah, lalu klik tombol Konversi untuk mendapatkan hasil konversi dalam bentuk Fahrenheit (°F).';
                    this.explanationTitle.textContent = 'Celsius ke Fahrenheit';
                    this.explanationContent.innerHTML = `
                        <h4>Cara Konversi Dari Celsius (°C) ke Fahrenheit (°F)</h4>
                        <p>Suhu S dalam derajat Fahrenheit (°F) sama dengan Suhu S dalam derajat Celsius (°C) kali 9/5 tambah 32.</p>
                        <div class="formula">S<sub>(°F)</sub> = (S<sub>(°C)</sub> × 9/5) + 32</div>
                        <p>atau</p>
                        <div class="formula">S<sub>(°F)</sub> = (S<sub>(°C)</sub> × 1.8) + 32</div>
                    `;
                } else {
                    // Fahrenheit to Celsius mode
                    this.fahrenheitOutput.readOnly = false;
                    this.celsiusInput.readOnly = true;
                    this.fahrenheitOutput.classList.remove('temperature-output');
                    this.fahrenheitOutput.classList.add('temperature-input');
                    this.celsiusInput.classList.remove('temperature-input');
                    this.celsiusInput.classList.add('temperature-output');
                    
                    inputLabel.textContent = 'Masukkan suhu derajat Fahrenheit (°F) ke kotak dibawah, lalu klik tombol Konversi untuk mendapatkan hasil konversi dalam bentuk Celsius (°C).';
                    this.explanationTitle.textContent = 'Fahrenheit ke Celsius';
                    this.explanationContent.innerHTML = `
                        <h4>Cara Konversi Dari Fahrenheit (°F) ke Celsius (°C)</h4>
                        <p>Suhu S dalam derajat Celsius (°C) sama dengan Suhu S dalam derajat Fahrenheit (°F) dikurangi 32, lalu dikali 5/9.</p>
                        <div class="formula">S<sub>(°C)</sub> = (S<sub>(°F)</sub> - 32) × 5/9</div>
                        <p>atau</p>
                        <div class="formula">S<sub>(°C)</sub> = (S<sub>(°F)</sub> - 32) × 0.556</div>
                    `;
                }
                
                // Add transition animation
                this.form.style.transform = 'rotateY(10deg)';
                setTimeout(() => {
                    this.form.style.transform = 'rotateY(0deg)';
                }, 300);
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            new TemperatureConverter();
        });

        // Add some interactive effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add floating effect to the converter card
        window.addEventListener('mousemove', (e) => {
            const card = document.querySelector('.converter-card');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 2;
            const rotateY = (x / rect.width) * 2;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset card position when mouse leaves
        document.querySelector('.converter-card').addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
