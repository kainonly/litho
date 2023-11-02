import { Component } from '@angular/core';

@Component({
  selector: 'app-index-builders-index',
  template: `
    <nz-result nzStatus="info">
      <div nz-result-title> 使用说明 </div>
      <div nz-result-content>
        <p>
          🔥 在大纲中【点击】任意元素来查看内容模型，【右键】获得更多操作，【拖拽】进行重组，以下为内容生成器主要类型：
        </p>
        <div style="padding: 0 1.5em">
          <nz-space nzDirection="vertical">
            <div *nzSpaceItem><nz-tag>导航</nz-tag> 通常用于导航分组显示；</div>
            <div *nzSpaceItem><nz-tag>集合类型</nz-tag> 通常用于表示一组相关实体的集合，例如：列表页；</div>
            <div *nzSpaceItem><nz-tag>单一类型</nz-tag> 通常用于表示独立的实体，例如：单页面；</div>
            <div *nzSpaceItem><nz-tag>自定义</nz-tag> 借助标识注入通过编程自定义页面；</div>
            <div *nzSpaceItem><nz-tag nzColor="error">停用</nz-tag> 状态关闭，该元素不被发布至项目中</div>
          </nz-space>
        </div>
      </div>
    </nz-result>
  `
})
export class IndexComponent {}
