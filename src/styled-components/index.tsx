import type { Component, JSX, ParentComponent } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import tags from './tags';

type StyledFunction = (rules: TemplateStringsArray) => ParentComponent;

type StyledComponentFactoriesWithTag = {
  [Tag in keyof JSX.IntrinsicElements]: StyledFunction;
};

type StyledComponentFactories = (
  tag: keyof JSX.IntrinsicElements | Component
) => StyledFunction;

type Styled = StyledComponentFactories & StyledComponentFactoriesWithTag;

let className = 0;

const createClassName = (rules: TemplateStringsArray) => {
  return () => {
    className++;
    const style = document.createElement('style');
    style.dataset.sc = '';
    style.textContent = `.sc-${className}{${rules[0]}}`.trim();
    document.head.appendChild(style);
    return `sc-${className}`;
  };
};

const createStyledComponent: StyledComponentFactories = (
  tag: keyof JSX.IntrinsicElements | Component
) => {
  return (rules: TemplateStringsArray) => {
    const StyledComponent: ParentComponent = (props) => {
      const className = createClassName(rules);
      const [local, others] = splitProps(props, ['children']);

      return (
        <Dynamic component={tag} class={className()} {...others}>
          {local.children}
        </Dynamic>
      );
    };

    return StyledComponent;
  };
};

const styled = createStyledComponent as Styled;

tags.forEach((tag) => {
  styled[tag] = styled(tag);
});

export { styled as default };
