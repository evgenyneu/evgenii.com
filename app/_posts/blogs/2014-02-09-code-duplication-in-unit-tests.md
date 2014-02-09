---
layout: blog_post
title:  "Code duplication in unit tests"
categories: blogs
---

Let me start with a statement many developers tend to agree:

> Code duplication is bad

But is it true for code in unit tests? Should we refactor our unit tests and remove duplications there as well?

From my personal experience, code duplication in unit tests is not only acceptable but desirable.

This is not a dogma or absolute truth. Here I am only sharing what usually works for me personally and why. It may not be the same for everybody. Each of us has unique background, coding style and screen wallpaper.

##Anybody home?##

First of all, let’s ask a question. What is the main thing a unit test does? My answer is - unit test verifies behaviour of some ‘code’. Important nuance here is the direction. It is the unit test that verifies its ‘code’ and not the other way around. The ‘code’ does not verify its unit test.

Ok, then what verifies the unit test? The answer is - nothing. There is nothing that checks if our unit test is bug-free. Except if we decide to write a unit test for our unit test. Which sounds like a good plot to another [Inception](http://en.wikipedia.org/wiki/Inception) movie.

##Coffee powered debugger##

But it is not quite correct, right? There is one thing that validates a unit test. This ‘thing’ is called a human being. In order to make sure that our test is valid we just look at it. Our eyes scan the unit test line by line. We run a little debugger in our brain simulating execution of the unit test.

And here is the main problem for me. My brain is pretty bad at debugging. This process of checking the unit test with my eyes is hard. It requires a lot of discipline, concentration and time. There is a big risk that I will miss a bug.

##The problem##

Ok, so now I have a issue:

  * To verify a unit test I need to look at it.
  * Verifying a test by looking at it is far from reliable.

How do we solve this issue? To be honest, I have no solution. The best thing I can do is to minimise the risk of missing bugs in unit test. I try to make unit test as simple as possible in order to make it easier for my eyes to catch the bugs.

I am very poor at debugging in my brain. That’s why I try to make unit test code as explicit as possible. In most cases I prefer using simple assertions that compare a variable with expected value.

##Simple assertion example##

Let’s look at a real life example of an assertion in a unit test. I will use a Ruby RSpec syntax in the examples.

Imagine that I need to check a string variable `str` with expected value `‘Hello world’`.

I do not compare `str` with a variable:

    # Avoid:
    str_expected = ‘Hello world’
    expect(str).to eq str_expected

Instead I prefer to explicitly write `‘Hello world’` text on the same line with the `str` variable:

    # Good practice:
    expect(str).to eq ‘Hello world’

##Example explained##

I prefer the last approach because it makes the unit test easier to read and understand. When I check this unit test with my eyes it is obvious what it does. The test ensures that `str` is `‘Hello world’`. And it is easy to notice a problem in this test, because it is so simple.

What happens if I use a variable `str_expected` in the assertion?

When we look at

    expect(str).to eq str_expected

we need to jump with our eyes and search for line where `str_expected` is initialised. It does not sound like much work, but it *is* additional work. Which requires more of our energy. Which is a limited resource. Especially at 5pm on Monday.


##Simple duplication example##

Now let’s get closer to the main topic - code duplication in unit tests.

I will start with a simple example - duplication of expected value in assertions. Imagine that we now have two assertions that ensure that variables `str1` and `str2` both equal `‘Hello world’`:

My first instinct is to see that `‘Hello world’` is mentioned twice, put it to a variable and use this variable in both assertions:

    # Avoid
    str_expected = ‘Hello world’
    expect(str1).to eq str_expected
    expect(str2).to eq str_expected

This approach has the same problem as I described above. It requires more effort to verify the unit test with one’s eyes. It becomes even harder if there is some code between those two assertions or if they are located in different files.

There is another problem. What if our program logic changed and `str2` now equals `‘My lovely horse’`? Now we need to update our unit test, which becomes even harder to read:

    # Avoid (str2 value changed)
    str1_expected = ‘Hello world’
    expect(str1).to eq str1_expected
    str2_expected = ‘My lovely horse’
    expect(str2).to eq str2_expected

To make things simple, I prefer just duplicating `‘Hello world’` in both assertions.

    # Good practice
    expect(str1).to eq ‘Hello world’
    expect(str2).to eq ‘Hello world’

And if `str2` changes, I just change one line:

    # Good practice (str2 value changed)
    expect(str1).to eq ‘Hello world’
    expect(str2).to eq ‘My lovely horse’

Win-win! Easy to write. Easy to read.

##More serious duplications##

Now let’s get to the main point. What if we have two unit tests with similar logic:

    # Good practice
    # Test 1:
    person = db.find_person(‘Peter’)
    assert(person.name).to eq ‘Peter’

    # Test 2:
    person = db.find_person(‘Ivan’)
    assert(person.name).to eq ‘Ivan’

It is quite tempting to remove duplication by extracting the common behaviour into a helper method `verify_person` and then call that method from both tests:

    # Avoid
    # Test 1:
    verify_person(‘Peter’)

    # Test 2:
    verify_person(‘Ivan’)

    # A helper method
    def verify_person(name)
      person = db.find_person(name)
      assert(person.name).to eq name
    end

I try to void this approach for exactly the same reason I mentioned two times already. This reason is so important so I will repeat it again.

In order to make sure the test is bug-free I need to verify it with my eyes. Inside my brain I go though the unit test code line by line, just like in a IDE debugger. Here is what is happening inside my brain:

1. Start reading test 1.
1. Read `verify_person(‘Peter’)`.
1. I need to know what `verify_person` does.
1. I search for `verify_person` method.
1. I try to locate `verify_person` on the same screen, scroll the page and/or search the current file or entire project.
1. After finding `verify_person` helper method, I read it.
1. Return to test 1, and check it as "verified" in my brain.

Now I do the same routine for test 2. Again, it all does not seem to be much work and happens very quickly especially after practice. But it is not the point. My point is - it requires *more* physical effort. Which is a limited resource. Especially at 5pm on Monday.

Now I want to repeat the preferred way of writing these tests:

    # Good practice
    # Test 1:
    person = db.find_person(‘Peter’)
    assert(person.name).to eq ‘Peter’

    # Test 2:
    person = db.find_person(‘Ivan’)
    assert(person.name).to eq ‘Ivan’

Reading these tests is easy. You just go line by line. No need to jump. No need to return back. Stupid simple. And this is exactly what I need at 5pm on Monday.

##Conclusion##

Unit tests are supposed to reveal bugs and not to add new ones. Right?

Here is the list of best practices that I try to follow:

* Make test code as simple as possible.
* Use simple assertions to compare actual and expected values.
* Write verified and expected value on the same line.

Things to avoid:

* Avoid using variables for expected values.
* Avoid extracting common functionality into helper methods
* In general, avoid creating complex code in your tests.

##Forget the rules. Do it your way##

Here I shared my own experience in unit testing. I mentioned approaches that help me write better unit tests. I try to follow these principles most of the time. But sometimes there are exceptions. Where it makes sense I do write helper methods, loops and other more complex code in unit tests. It really depends on the situation.

And most importantly - coding should be fun.


