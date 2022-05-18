import Component from "./src/core/Component.js";
import ItemAppender from "./src/components/ItemAppender.js";
import Items from "./src/components/Items.js";
import ItemFilter from "./src/components/ItemFilter.js";
import { FILTER_TYPE } from "./src/utils/const.js";

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: "item1",
          active: true,
        },
        {
          seq: 2,
          contents: "item2",
          active: false,
        },
        {
          seq: 3,
          contents: "item3",
          active: true,
        },
      ],
    };
  }

  template() {
    return `
        <header data-component="item-appender"></header>
        <main data-component="items"></main>
        <footer data-component="item-filter"></footer>
        `;
  }

  mounted() {
    const { addItem, toggleItem, deleteItem, filteredItems, filterItem } = this;

    const $itemAppender = document.querySelector(
      '[data-component="item-appender"]'
    );

    const $items = document.querySelector('[data-component="items"]');

    const $itemFilter = document.querySelector(
      '[data-component="item-filter"]'
    );

    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });

    if (this.$components.items) {
      this.$components.items.$target = $items;
      // console.log("이게뭘까요", this.$components);
      this.$components.items.$props = {
        filteredItems,
        toggleItem: toggleItem.bind(this),
        deleteItem: deleteItem.bind(this),
      };
    } else {
      this.$components.items = new Items($items, {
        filteredItems,
        toggleItem: toggleItem.bind(this),
        deleteItem: deleteItem.bind(this),
      });
    }

    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((n) => n.seq)) + 1;
    const active = true;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((n) => n.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  deleteItem(seq) {
    const result = this.showModal("are you sure do you want to delete?");
    if (result) {
      const items = [...this.$state.items];
      items.splice(
        items.findIndex((n) => n.seq === seq),
        1
      );
      this.setState({ items });
    }
  }

  showModal = (message) => {
    return window.confirm(message);
  };

  get filteredItems() {
    const { items, isFilter } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === FILTER_TYPE.ACTIVE && active) ||
        (isFilter === FILTER_TYPE.INACTIVE && !active) ||
        isFilter === FILTER_TYPE.ALL
    );
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
