---
sidebar_position: 4
title: Relationship
---

### Introduction

Pocketto provides a way to define relationships between models. This is useful when you want to define a relationship between two models:
- [BelongsTo](#belongsto)
- [HasOne](#hasone)
- [HasMany](#hasmany)
- [BelongsToMany](#belongstomany)

### BelongsTo

The `BelongsTo` decorator is used to define a one-to-one relationship between two models. The `BelongsTo` decorator takes the target model as an argument.

```tsx
import { Relational, Model, BelongsTo } from 'pocketto';

@Relational
export class User extends Model {
  profileId!: string;

  @BelongsTo('Profile', 'profileId', 'id')
  profile!: Profile;

}
```
You may query the related model using the `with` method.

```tsx
const user = await User.query().with('profile').find('User1');
const profile = user.profile;
```
Or, you may query the related model using the `relationship` method.

```tsx
const profile = await User.relationship().profile().find('Profile1');
```


### HasOne

The `HasOne` decorator is used to define a one-to-one relationship between two models. The `HasOne` decorator takes the target model as an argument.

```tsx
import { Relational, Model, HasOne } from 'pocketto';

@Relational
export class Profile extends Model {
  @HasOne('User')
  user!: User;
}
```

You may query the related model using the `with` method.

```tsx
const profile = await Profile.query().with('user').find('Profile1');
const user = profile.user;
```

Or, you may query the related model using the `relationship` method.

```tsx
const user = await Profile.relationship().user().find('User1');
```

### HasMany

The `HasMany` decorator is used to define a one-to-many relationship between two models. The `HasMany` decorator takes the target model as an argument.

```tsx
import { Relational, Model, HasMany } from 'pocketto';

@Relational
export class User extends Model {
  @HasMany('Post')
  posts!: Post[];
}
```

You may query the related model using the `with` method.

```tsx

const user = await User.query().with('posts').find('User1');

const posts = user.posts;
```

Or, you may query the related model using the `relationship` method.

```tsx  
const posts = await User.relationship().posts().find('User1');
```

### BelongsToMany

The `BelongsToMany` decorator is used to define a many-to-many relationship between two models. The `BelongsToMany` decorator takes the pivot model and the target model as arguments.

```tsx
import { Relational, Model, BelongsToMany } from 'pocketto';

@Relational
export class User extends Model {
  @BelongsToMany('UserPost', 'Post')
  posts!: Post[];
}
```

You may query the related model using the `with` method.

```tsx
const user = await User.query().with('posts').find('User1');
const posts = user.posts;
```

Or, you may query the related model using the `relationship` method.

```tsx
const posts = await User.relationship().posts().find('User1');
```
