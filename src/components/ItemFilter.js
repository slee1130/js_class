import Component from "../core/Component.js";
export default class ItemFiter extends Component {
  template() {
    return `
       <button data-is-filter="0" class="filterBtn">전체보기</button>
       <button data-is-filter="1" class="filterBtn">활성보기</button>
       <button data-is-filter="2" class="filterBtn">비활성보기</button>
        `;
  }

  setEvent() {
    const { filterItem } = this.$props;
    this.addEvent("click", ".filterBtn", ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}
