2048实践篇
===========
My 2048 Game is coming soon.[2048](smallmacro.github.io/2048)


##2048Game 设计分析
###游戏的架构设计
- UI-HTML+CSS（view）
- 游戏主逻辑-js/jquery(controller),包括动画逻辑和底层控制逻辑
- 游戏数据(model)

###游戏设计分析过程
- 初始化随机过程
- 定义 `上`，`下`，`左`，`右` 四个动作函数（包括对应的判断函数）
- 更新score和刷新UI。