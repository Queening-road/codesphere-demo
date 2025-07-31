// Smooth scroll functionality
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to demo section
function scrollToDemo() {
    smoothScroll('#demo');
}

// Scroll to features section
function scrollToFeatures() {
    smoothScroll('#features');
}

// Submit task functionality
function submitTask() {
    const userInput = document.getElementById('userInput').value.trim();
    const modelSelect = document.getElementById('modelSelect').value;
    const outputContent = document.getElementById('outputContent');
    
    if (!userInput) {
        alert('Please enter your command');
        return;
    }
    
    // Show loading state
    outputContent.innerHTML = `
        <div class="ai-message">
            <div class="ai-avatar">AI</div>
            <div class="ai-text">
                Processing your request using ${modelSelect} model...<br>
                <span class="typing-indicator">▋</span>
            </div>
        </div>
    `;
    
    // Simulate AI processing
    setTimeout(() => {
        simulateAIResponse(userInput, modelSelect, outputContent);
    }, 2000);
}

// Simulate AI response
function simulateAIResponse(userInput, model, outputContent) {
    const responses = {
        'claude': [
            'I have analyzed your code and found several areas for optimization:',
            '1. Performance optimization: Recommend using caching mechanisms to reduce redundant calculations',
            '2. Memory management: Pay attention to timely release of unnecessary resources', 
            '3. Error handling: Recommend adding more comprehensive exception handling mechanisms',
            '',
            'These improvements can significantly enhance code performance and stability.'
        ],
        'kimi': [
            'Based on your requirements, I have generated the following solution:',
            '',
            '```python',
            'def optimized_function():',
            '    # Use caching to optimize performance',
            '    cache = {}',
            '    def wrapper(*args):',
            '        if args not in cache:',
            '            cache[args] = compute_result(*args)',
            '        return cache[args]',
            '    return wrapper',
            '```',
            '',
            'This implementation can effectively improve performance.'
        ],
        'qwen': [
            'I understand your requirements. Here is a detailed code analysis:',
            '',
            '**Code Quality Assessment:**',
            '- Readability: Good',
            '- Performance: Needs optimization',
            '- Security: Recommend strengthening',
            '',
            '**Specific Recommendations:**',
            '1. Add input validation',
            '2. Optimize algorithm complexity',  
            '3. Add unit tests'
        ],
        'glm': [
            'Based on your code, I have provided the following improvement plan:',
            '',
            '**Main Issues:**',
            '1. Lack of error handling',
            '2. Obvious performance bottlenecks',
            '3. Code structure can be optimized',
            '',
            '**Solutions:**',
            'Recommend refactoring code structure, using design patterns to improve maintainability.'
        ]
    };
    
    const response = responses[model] || responses['claude'];
    let fullResponse = '';
    
    // Display response line by line, simulating typing effect
    let lineIndex = 0;
    const typeInterval = setInterval(() => {
        if (lineIndex < response.length) {
            fullResponse += response[lineIndex] + '<br>';
            outputContent.innerHTML = `
                <div class="ai-message">
                    <div class="ai-avatar">AI</div>
                    <div class="ai-text">
                        ${fullResponse}
                        <span class="typing-indicator">▋</span>
                    </div>
                </div>
            `;
            lineIndex++;
        } else {
            clearInterval(typeInterval);
            // Remove typing indicator
            outputContent.innerHTML = `
                <div class="ai-message">
                    <div class="ai-avatar">AI</div>
                    <div class="ai-text">
                        ${fullResponse}
                    </div>
                </div>
            `;
            
            // Add save result button
            setTimeout(() => {
                outputContent.innerHTML += `
                    <div style="margin-top: 20px; text-align: center;">
                        <button class="btn-primary" onclick="saveResult()">
                            <i class="fas fa-download"></i>
                            Save Result to Local
                        </button>
                    </div>
                `;
            }, 1000);
        }
    }, 300);
}

// Save result functionality
function saveResult() {
    const outputContent = document.getElementById('outputContent');
    const text = outputContent.innerText;
    
    // Create download link
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codesphere-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Result saved to local!');
}

// Task list interaction
document.addEventListener('DOMContentLoaded', function() {
    // Task item click events
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove other active states
            taskItems.forEach(i => i.classList.remove('active'));
            // Add current active state
            this.classList.add('active');
            
            // Simulate loading task details
            const taskName = this.querySelector('.task-name').textContent;
            loadTaskDetails(taskName);
        });
    });
    
    // Model selection change event
    const modelSelect = document.getElementById('modelSelect');
    modelSelect.addEventListener('change', function() {
        const selectedModel = this.value;
        console.log('Selected model:', selectedModel);
    });
    
    // File upload button events
    const uploadButtons = document.querySelectorAll('.upload-btn');
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.textContent.includes('Image') ? 'image/*' : '*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    alert(`File "${file.name}" uploaded successfully!`);
                }
            };
            input.click();
        });
    });
});

// Load task details
function loadTaskDetails(taskName) {
    const outputContent = document.getElementById('outputContent');
    
    const taskDetails = {
        'Code Analysis Task': {
            status: 'Completed',
            result: 'Code analysis completed, found 3 potential issues, optimization suggestions generated.'
        },
        'Bug Fix': {
            status: 'Running',
            result: 'Analyzing error logs, expected to complete fix in 5 minutes.'
        },
        'Feature Development': {
            status: 'Pending',
            result: 'Task added to queue, waiting for resource allocation.'
        }
    };
    
    const task = taskDetails[taskName];
    if (task) {
        outputContent.innerHTML = `
            <div class="ai-message">
                <div class="ai-avatar">AI</div>
                <div class="ai-text">
                    <strong>Task: ${taskName}</strong><br>
                    <strong>Status: ${task.status}</strong><br><br>
                    ${task.result}
                </div>
            </div>
        `;
    }
}

// Navigation bar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scroll to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// Add page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Feature card hover effect enhancement
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        submitTask();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        const userInput = document.getElementById('userInput');
        if (userInput === document.activeElement) {
            userInput.value = '';
        }
    }
});

// Add input box auto-resize height
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 300) + 'px';
    });
});

// Add page visibility detection
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page shown');
    }
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
});

// Add performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});