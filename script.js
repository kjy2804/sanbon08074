
document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const resultContainer = document.getElementById('result');
    const selectedNumbersDiv = document.getElementById('selectedNumbers');
    
    drawButton.addEventListener('click', drawNumbers);
    resetButton.addEventListener('click', resetDraw);
    
    // Tailwind config for custom colors
    tailwind.config = {
        theme: {
            extend: {
                animation: {
                    'bounce-slow': 'bounce 2s infinite',
                    'pulse-slow': 'pulse 3s infinite'
                }
            }
        }
    };
    
    async function drawNumbers() {
        // Show loading SweetAlert
        Swal.fire({
            title: '당번을 뽑고 있습니다...',
            html: '<i class="bi bi-arrow-repeat text-primary" style="font-size: 3rem; animation: spin 1s linear infinite;"></i>',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            backdrop: 'rgba(0,0,0,0.4)',
            customClass: {
                popup: 'rounded-3xl'
            }
        });
        
        // Simulate drawing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 1부터 25까지 숫자 배열 생성
        const numbers = Array.from({length: 25}, (_, i) => i + 1);
        
        // 랜덤으로 5개 선택
        const selectedNumbers = [];
        const availableNumbers = [...numbers];
        
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            selectedNumbers.push(availableNumbers.splice(randomIndex, 1)[0]);
        }
        
        // 선택된 숫자를 오름차순으로 정렬
        selectedNumbers.sort((a, b) => a - b);
        
        // 결과 표시
        displayResults(selectedNumbers);
        
        // 성공 메시지 표시
        Swal.fire({
            title: '청소당번이 선정되었습니다! 🎉',
            html: `선택된 번호: <strong class="text-primary">${selectedNumbers.join(', ')}번</strong>`,
            icon: 'success',
            confirmButtonText: '확인',
            confirmButtonColor: '#6366f1',
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'rounded-pill'
            }
        });
        
        // 버튼 상태 변경
        drawButton.style.display = 'none';
        resultContainer.style.display = 'block';
    }
    
    function displayResults(numbers) {
        selectedNumbersDiv.innerHTML = '';
        
        numbers.forEach((number, index) => {
            const numberCard = document.createElement('div');
            numberCard.className = 'number-card';
            numberCard.textContent = number + '번';
            numberCard.style.animationDelay = `${index * 0.1}s`;
            selectedNumbersDiv.appendChild(numberCard);
        });
    }
    
    function resetDraw() {
        Swal.fire({
            title: '다시 뽑으시겠습니까?',
            text: '현재 결과가 초기화됩니다.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#6b7280',
            confirmButtonText: '네, 다시 뽑기',
            cancelButtonText: '취소',
            customClass: {
                popup: 'rounded-3xl',
                confirmButton: 'rounded-pill',
                cancelButton: 'rounded-pill'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // 결과 숨기기
                resultContainer.style.display = 'none';
                
                // 버튼 상태 원복
                drawButton.style.display = 'inline-block';
                
                // 결과 초기화
                selectedNumbersDiv.innerHTML = '';
                
                // 초기화 완료 토스트
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: '초기화되었습니다',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'rounded-xl'
                    }
                });
            }
        });
    }
});

// Add spin animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
