// 平滑滚动功能
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 滚动到演示区域
function scrollToDemo() {
    smoothScroll('#demo');
}

// 滚动到功能特性区域
function scrollToFeatures() {
    smoothScroll('#features');
}

// 提交任务功能
function submitTask() {
    const userInput = document.getElementById('userInput').value.trim();
    const modelSelect = document.getElementById('modelSelect').value;
    const outputContent = document.getElementById('outputContent');
    
    if (!userInput) {
        alert('请输入您的指令');
        return;
    }
    
    // 显示加载状态
    outputContent.innerHTML = `
        <div class="ai-message">
            <div class="ai-avatar">AI</div>
            <div class="ai-text">
                正在使用 ${modelSelect} 模型处理您的请求...<br>
                <span class="typing-indicator">▋</span>
            </div>
        </div>
    `;
    
    // 模拟AI处理过程
    setTimeout(() => {
        simulateAIResponse(userInput, modelSelect, outputContent);
    }, 2000);
}

// 模拟AI响应
function simulateAIResponse(userInput, model, outputContent) {
    const responses = {
        'claude': [
            '我已经分析了您的代码，发现了几个可以优化的地方：',
            '1. 性能优化：建议使用缓存机制减少重复计算',
            '2. 内存管理：注意及时释放不需要的资源',
            '3. 错误处理：建议添加更完善的异常处理机制',
            '',
            '这些改进可以显著提升代码的性能和稳定性。'
        ],
        'kimi': [
            '根据您的需求，我为您生成了以下解决方案：',
            '',
            '```python',
            'def optimized_function():',
            '    # 使用缓存优化性能',
            '    cache = {}',
            '    def wrapper(*args):',
            '        if args not in cache:',
            '            cache[args] = compute_result(*args)',
            '        return cache[args]',
            '    return wrapper',
            '```',
            '',
            '这个实现可以有效提升性能。'
        ],
        'qwen': [
            '我理解您的需求，这里是详细的代码分析：',
            '',
            '**代码质量评估：**',
            '- 可读性：良好',
            '- 性能：需要优化',
            '- 安全性：建议加强',
            '',
            '**具体建议：**',
            '1. 添加输入验证',
            '2. 优化算法复杂度',
            '3. 增加单元测试'
        ],
        'glm': [
            '基于您的代码，我提供了以下改进方案：',
            '',
            '**主要问题：**',
            '1. 缺少错误处理',
            '2. 性能瓶颈明显',
            '3. 代码结构可以优化',
            '',
            '**解决方案：**',
            '建议重构代码结构，采用设计模式提升可维护性。'
        ]
    };
    
    const response = responses[model] || responses['claude'];
    let fullResponse = '';
    
    // 逐行显示响应，模拟打字效果
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
            // 移除打字指示器
            outputContent.innerHTML = `
                <div class="ai-message">
                    <div class="ai-avatar">AI</div>
                    <div class="ai-text">
                        ${fullResponse}
                    </div>
                </div>
            `;
            
            // 添加保存结果按钮
            setTimeout(() => {
                outputContent.innerHTML += `
                    <div style="margin-top: 20px; text-align: center;">
                        <button class="btn-primary" onclick="saveResult()">
                            <i class="fas fa-download"></i>
                            保存结果到本地
                        </button>
                    </div>
                `;
            }, 1000);
        }
    }, 300);
}

// 保存结果功能
function saveResult() {
    const outputContent = document.getElementById('outputContent');
    const text = outputContent.innerText;
    
    // 创建下载链接
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codesphere-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('结果已保存到本地！');
}

// 任务列表交互
document.addEventListener('DOMContentLoaded', function() {
    // 任务项点击事件
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他活动状态
            taskItems.forEach(i => i.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 模拟加载任务详情
            const taskName = this.querySelector('.task-name').textContent;
            loadTaskDetails(taskName);
        });
    });
    
    // 模型选择变化事件
    const modelSelect = document.getElementById('modelSelect');
    modelSelect.addEventListener('change', function() {
        const selectedModel = this.value;
        console.log('选择的模型:', selectedModel);
    });
    
    // 文件上传按钮事件
    const uploadButtons = document.querySelectorAll('.upload-btn');
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.textContent.includes('图片') ? 'image/*' : '*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    alert(`文件 "${file.name}" 上传成功！`);
                }
            };
            input.click();
        });
    });
});

// 加载任务详情
function loadTaskDetails(taskName) {
    const outputContent = document.getElementById('outputContent');
    
    const taskDetails = {
        '代码分析任务': {
            status: '已完成',
            result: '代码分析完成，发现3个潜在问题，已生成优化建议。'
        },
        'Bug 修复': {
            status: '运行中',
            result: '正在分析错误日志，预计5分钟后完成修复。'
        },
        '功能开发': {
            status: '等待中',
            result: '任务已加入队列，等待资源分配。'
        }
    };
    
    const task = taskDetails[taskName];
    if (task) {
        outputContent.innerHTML = `
            <div class="ai-message">
                <div class="ai-avatar">AI</div>
                <div class="ai-text">
                    <strong>任务：${taskName}</strong><br>
                    <strong>状态：${task.status}</strong><br><br>
                    ${task.result}
                </div>
            </div>
        `;
    }
}

// 导航栏滚动效果
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

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 功能卡片悬停效果增强
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

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter 提交任务
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        submitTask();
    }
    
    // Escape 清空输入
    if (e.key === 'Escape') {
        const userInput = document.getElementById('userInput');
        if (userInput === document.activeElement) {
            userInput.value = '';
        }
    }
});

// 添加输入框自动调整高度
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 300) + 'px';
    });
});

// 添加页面可见性检测
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面已隐藏');
    } else {
        console.log('页面已显示');
    }
});

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 添加性能监控
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('页面加载时间:', loadTime + 'ms');
    }
}); 