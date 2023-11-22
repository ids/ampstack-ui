# General Items

Q. Why not in Typescript?

A. [There are good reasons](https://everyday.codes/javascript/7-really-good-reasons-not-to-use-typescript/)

---

Q. Why not use modern Javascript classes instead of the legacy syntax?

A. [There are good reasons](https://everyday.codes/javascript/please-stop-using-classes-in-javascript/)

---
Q. Where is the dependency injection, interfaces, test harnesses and mocks?

A. Maybe later.  The more you do up front, the more you have to change later, and that price is paid in effort and time. Time is cost best managed. Ideally investments are made in response to actual problems, not perceived ones (right Typescript?).

---
Q. Micro-services, Micro-services, Micro-services.

A. They are just services.  Amazon actually invented them and still does them best.  Netflix popularized the term `micro` because they had to divide up a large single application into several components (like Amazon had already done previously, AWS, the infrastructure Netflix runs on).  It had more to do with enabling parallel teams to work independently on seperate code bases, managing seperate deployments (ala AWS services) then anything about the size of the service.  Five developer teams building 60 container micro-service applications are inverting the purpose of the pattern... almost to absurdity.  If you are a small team with little chance of becoming a big team: build a simple UI-API application ala AmpStack and stop the madness.  
