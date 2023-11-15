import { defineModule } from '@directus/extensions-sdk';
import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, createTextVNode } from 'vue';

var script = defineComponent({});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_private_view = resolveComponent("private-view");

  return (openBlock(), createBlock(_component_private_view, { title: "My Custom Module" }, {
    default: withCtx(() => [
      createTextVNode("Hello World!")
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "src/module.vue";

var index = defineModule({
  id: "custom",
  name: "Custom",
  icon: "box",
  routes: [
    {
      path: "",
      component: script
    }
  ]
});

export { index as default };
