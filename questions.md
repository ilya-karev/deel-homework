# What is the difference between Component and PureComponent? Give an example where it might break my app.

React.PureComponent improves the perfomance of the app thank to the way of state change comparing. When it comparing object, it checks only references, not the whole values.

Also, if the parent of PureComponent rerenders, it will not rerender (if there were no changes in its props)

# Context + ShouldComponentUpdate might be dangerous. Why is that?

If, for example, you have changed smth in a context, which is used by many components, both parents & children, and in some of them you use ShouldComponentUpdate. You have always to remember where you use ShouldComponentUpdate and add there the checks for every context changes. And if you forget about it, you'll get come unexpected behavior of the components. So, using the context with ShouldCOmponentUpdate might will do more harm than good

# Describe 3 ways to pass information from a component to its PARENT.

1. It's a simple function we send as a prop to a child component and call it there.
2. We can use React Context functionality, set its state in the component and get it in the parent.
3. Like the previous one, we can use some state manager tool, like MobX or Redux
4. And there are several more exotic variants like using localStorage: add eventListener to parent & change storage in the child - but I hope we'll never approaches like these 

# Give 2 ways to prevent components from re-rendering.

There are different ways based on what exactly we need.
1. For example, we can use useRef hook instead of useState if we want to save some info without additional rerenders. 
2. We can use memoization like useCallback & useMemo if we want not to rerender when callbacks dependencies were't changed

# What is a fragment and why do we need it? Give an example where it might break my app.

React requires us to wrap components with a single element, and the React.Fragment (or <></> in modern versions) is uses for it and preforms the correct result in DOM.
As it is not adding a real DOM node, you need always to keep an eye on the styles and DOM structure, because the interface could looks much different than you expected.

# Give 3 examples of the HOC pattern.
1. standart `withProps`
2. some `withCommoData` if we want to pass common data to any function
3. or Even `HocAll` to join several hocs `HocAll(HocA, HocB, HocC)`

# What's the difference in handling exceptions in promises, callbacks and async...await?
If, for example, we have a several requests we want to send to server one by one:
1. For callbacks, we need to add an error handler for every function with callbacks if we want to intercept an error
2. Whereas for promises we can just add `.catch` to the end of all promises and it will handle any error
3. And we can wrap all awaits with `try` and work with the exceptions in the `catch` section

# How many arguments does setState take and why is it async
The first one is a new value or a function, where we can get the previous value in the params.
The second one is a callback that would be called when state will be updated
Its asynchronousness is the one of the cases thet makes React so fast. React can join several setState calls in one package and use it to update the state.

# List the steps needed to migrate a Class to Function Component.
1. Replace render method with a simple return 
2. Change all lifecycle methods to useEffect hhok
3. Remove constructor
4. Remove all this's (this.state, this.setState to useState)

# List a few ways styles can be used with components.
- CSS in JS
- classNames with css (scss, less) files
- html styles
- PlainCSS

# How to render an HTML string coming from the server.
You haven't do it, but if there is a very strong reason, you can use dangerouslySetInnerHTML if we speak about React
