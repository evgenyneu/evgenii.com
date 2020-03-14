---
layout: blog_post
comments: true
title: "The logistic function"
tags: science
---

In this article I want to discuss the logistic function that can be used to describe the spread of an infectious disease.

## How infection spreads?

Infectious disease is the one that can spread from human to human. Since each sick person can infect healthy people around him, the more infected people are there in the population, the more people are being infected each day. In math language this means that the rate of change of `N` (the number of infected people) with time `t` is proportional to the number of infected people:

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
where `A` is initial number of infected people at time zero, and `e` is another number equal to about 2.718.

This is a very simple infection model but it can be accurate at the beginning of an epidemic. If we start with just one infected person (`A=1`) and use rate `r=1`, then after just five days the number of infected people will be nearly 150 (Fig. 1).

<div class='isTextCentered'>
  <img src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0030_exponential_growth_of_infection.png' alt='Exponential growth of infection' class='isMax500PxWide isTextCentered' >
</div>
<div class='isTextCentered'>
<p>Figure 1: Exponential growth of infection that starts with one infected person.</p>
</div>

The virus spreads fast... like a virus. Remarkably, it will take only 23 days until entire population of Earth (nearly 8 billion people) is infected.

## What happens when we run out of healthy people? Logistic function happens.

The model shown on Fig. 1 can be very accurate at the start, when most people are healthy. But at some point there will be more ill people around, so there will be more interaction between people who are already infected. As a result, the rate if infection of healthy people will slow down. This can be written in math language as

<div class='Equation isTextCentered'>
  <span></span>
  <span>
    <img class='isMax200PxWide' src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0040_logistic_differectial_equation.png' alt="Logistic differential equation describing spread of infection">
  </span>
  <span>(3)</span>
</div>

where `K` is the total number of people.

At the start of an epidemic, the number of infected people `N` is small, and therefore Equation 3 gives almost the same result as Equation 1. In other words, at the beginning, Equation 3 describes exponential spread of disease. However, as the number of infected people `N` gets closer to the total number of people `K`, the term `N/K` starts to approach 1, and `(1 - N/K)` terms approaches zero. Consequently, the rate of change `dN/dT` also approaches zero. This means that  the spread of the disease slows down when many people are ill.

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

## How does the logistic function look like?

A plot of a logistic function looks like this:

<div class='isTextCentered'>
  <img src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0070_logistic_growth_of_infection.png' alt='Logistic growth of infection' class='isMax500PxWide isTextCentered' >
</div>
<div class='isTextCentered'>
<p>Figure 2: Logistic growth of infection that starts with one infected person (solid blue line). Orange dashed line shows exponential growth, for comparison.</p>
</div>

In this plot we used values <code>K=8 billion</code>, <code>r=1</code> and <code>Q=8 billion - 1</code>. You can try different values [on Desmos](https://www.desmos.com/calculator/w4jhte2hol). We can see that initially, logistic and exponential functions are the same. But after about 20 days the number of infected people starts to grow more slowly for the logistic function, until `N` levels off at 8 billion people.

Sick! Literally.


## Modelling real data

We can use logistic function to model the spread of COVID-19 infection using real data. These data are the number of confirmed cases in different countries at successive days.

<div class='isFullScreenWide isTextCentered'>
  <img src='/image/blog/2020-03-12-model-covid19-with-logistic-function/0080_covid19_modeling_with_logistic_function_3.png' alt='Modeling confirmed cases of COVID-19 with logistic function' class='isMax900PxWide isTextCentered' >
</div>

<div class='isTextCentered'>
  <p>Figure 3: Modeling confirmed cases of COVID-19 worldwide, excluding China.</p>
</div>

The orange circles are confirmed cases, and the solid blue line is the model. The bright shaded region around the model line indicates model's uncertainty.

For this model, we used the total population of `K=7.8 billion`. And the initial number of infected people was `A=8`. The model predicted the growth factor to be around `r=0.18`. The code for the model is [here](https://github.com/evgenyneu/covid19), and if you want to understand how it works, there is a [Statistical Rethinking](https://xcelab.net/rm/statistical-rethinking/) textbook by Richard McElreath, which is pure gold, in my opinion. :)


## Links

* [Model code](https://github.com/evgenyneu/covid19).

* [Source for the Figure 1 in Sketch format](/files/2020/03/exponential_growth.sketch).

* [Source for the Figure 2 in Sketch format](/files/2020/03/logistic_function.sketch).

* [COVID-19 data](https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv) from Johns Hopkins University.
