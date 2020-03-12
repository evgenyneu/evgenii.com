---
layout: blog_post
comments: true
title: "Modelling COVID-19 infection using Stan and Python"
meta_description: "I show how to use Star and Python to model COVID-19 confirmed cases data using logistic function."
tags: science
---

In this article I want to show how to use logistic function to model the number of confirmed cases of people infected with COVID-19 (coronavirus).

## How infection spreads?

COVID-19 is an infectious disease that spreads from human to human. Since each sick person can infect healthy people around him, the more infected people are in the population, the more people are being infected each day. In math language this means that the rate of change of the number of infected people (N) with time (t) is proportional to the number of infected people:

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax100PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0010_exponential_growth_infection.png' alt="Differential equation describing change of the number of infected people.">
  </span>
  <span>(1)</span>
</div>
where `r` is a number that determines how fast infection spreads (i.e. how infectious is the disease). This is a first order linear differential equation, and it has the general solution of the form:
<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax120PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0020_solution.png' alt="Solution to differential equation.">
  </span>
  <span>(2)</span>
</div>
where `A` is initial number of infected people at time zero, and `e` is about 2.718.

This is a very simple infection model but it can be accurate at the beginning of an epidemic. If we start with just one infected person (`A=1`) and use `r=1`, then after just five days the number of infected people will be nearly 150 (Fig. 1).

<div class='isTextCentered'>
  <img src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0030_exponential_growth_of_infection.png' alt='Exponential growth of infection' class='isMax500PxWide isTextCentered' >
</div>
<div class='isTextCentered'>
<p>Figure 1: Exponential growth of infection that starts with one infected person.</p>
</div>

It spreads fast... like a virus. Remarkably, it will take only 23 days until entire population of Earth (nearly 8 billion people) is infected.

## What happens when we run out of healthy people? Logistic function happens.

The model shown on Fig. 1 can be very accurate at the start, when most people are healthy. But at some point there will be more ill people around, and there will be more interaction between people who are already infected. As a result, the rate if infection of healthy people will slow down. This can be written in math language as

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax200PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0040_logistic_differectial_equation.png' alt="Logistic differential equation describing spread of infection">
  </span>
  <span>(3)</span>
</div>

where `K` is the total number of people.

At the start of an epidemic, the number of infected people `N` is small, and therefore Equation 3 gives almost the same result as Equation 1. In other words, at the beginning, Equation 3 describes exponential spread of disease. As the number of infected people `N` gets closer to the total number of people `K`, however, the term `N/K` starts to approach 1, and `(1 - N/K)` terms approaches zero. Consequently, the rate of change `dN/dT` also approaches zero. This means that  the spread of the disease slows down when many people are ill.

Equation 3 sounds reasonable and it is called logistic growth model. This equation can be solved symbolically to get the general solution:
<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax170PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0050_solution_to_logistic_differential_equation.png' alt="Solution to logistic differential equation">
  </span>
  <span>(4)</span>
</div>
where `r` is the growth rate number, `K` is total number of people in the population, and Q is a number that relates to the initial number of sick people `A` as follows:
<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax120PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0060_constant_q.png' alt="Constant Q">
  </span>
  <span>(5)</span>
</div>
Equation 4 is a famous equation and it is called the Logistic Function. Sal Khan [has made excellent videos](https://www.khanacademy.org/math/differential-equations/first-order-differential-equations/logistic-differential-equation/v/solving-logistic-differential-equation-part-1) where he shows how to derive it from the logistic growth model (Equation 3).





## Links

* [Model code](https://github.com/evgenyneu/covid19).

* [Source for the Figure 1 in Sketch format](/files/2020/03/exponential_growth.sketch).
