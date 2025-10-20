## Memento

Allows capturing and externalizing an object's internal state so that the object can be restored to that state later.

It is useful when you need to save the state of an object in order to return to it in the future. The Memento pattern helps implement undo/redo functionality by storing snapshots of an object's state without violating encapsulation. Typically, it involves three roles: the Originator (the object whose state is saved), the Memento (the snapshot), and the Caretaker (which manages the saved states).

For more information, visit [Refactoring Guru](https://refactoring.guru/design-patterns/memento)
