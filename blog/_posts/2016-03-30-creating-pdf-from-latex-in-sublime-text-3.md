---
layout: blog_post
comments: true
title: "Creating a PDF from a LaTeX document in Sublime Text 3 on Mac OS X"
meta_description: "Instructions on how to setup Sublime Text 3 to build PDF from a LaTeX document."
tags: science programming
---

LaTeX is a markup language that is often used for writing scientific documents.  Sublime Text is a text editor which I like for its speed, looks and simplicity. I am currently writing a math assignment in LaTeX in Sublime Text 3 and I want to share my setup.

With my setup I can create a PDF file from the current LaTeX document by pressing *Command-B* keys in Sublime Text. Under the hood this runs the `pdflatex` program that is installed with the MacTeX distribution. On completion Sublime Text shows the results of the build.
This setup requires [MacTeX distribution](http://www.tug.org/mactex/), [Sublime Text 3](https://www.sublimetext.com/3) and writing four lines of text.



1) Open Sublime Text 3 and select *New Build System...* from *Tools > Build System* menu.

<div class='isTextCentered'>
  <img src='/image/blog/2016-03-30-creating-pdf-from-latex-sublime-text-3/010_create_new_build_system.png' alt='Create new LaTeX build system' class='isMax400PxWide hasBorderShade90'>
</div>

2) A new window will appear in Sublime Text containing the text:

```JSON
{
  "shell_cmd": "make"
}
```

4) Replace it with the following:

```JSON
{
    "cmd": ["/Library/TeX/texbin/pdflatex","$file"],
    "selector": "text.tex.latex"
}
```

These are the Sublime Text build instructions. The `cmd` part instructs Sublime Text to run `pdflatex` command with the path to the current file. The `selector` setting is for using this build method for all ".tex" files when *Tools > Build System > Automatic* is selected.

5) Notice that we used the following path: `/Library/TeX/texbin/pdflatex`. Verify that this path is correct by launching the Terminal app and executing the command

```
which pdflatex
```

If the output of the command is different, put it in the build file instead of `/Library/TeX/texbin/pdflatex`.

6) Save the build system file with *Command-S* and name it `LaTeX.sublime-build`. The file will be saved to

```
/Users/YOUR_USER_NAME/Library/Application Support/Sublime Text 3/Packages/User/LaTeX.sublime-build
```

7) Open *Tools > Build System menu*. You will see the new *LaTeX* build system option that we created. Select LaTeX or *Automatic* option.

Congratulations, the setup is complete!


## Building a PDF from a LaTeX document

To create a PDF file from a LaTeX document open it in Sublime Text and press Command-B. This can also be done by selecting the *Tools > Build* menu item.

When the build is finished Sublime Text will show its results. The build results area can be opened at any time from *Tools > Build Results* menu and closed with *Esc* key.

<div class='isTextCentered'>
  <img src='/image/blog/2016-03-30-creating-pdf-from-latex-sublime-text-3/020_latex_build_results_sublime_text.png' alt='LaTeX build results in Sublime Text' class='isMax100PercentWide hasBorderShade90'>
</div>


This method was tested on Mac OS X El Capitan with MacTeX-2015 and Sublime Text build 3103.

## Viewing a PDF with auto reload

Usually as I am writing a LaTeX document in Sublime Text I want to see the PDF. For that purpose I was first using the Preview app which is pre-installed on OS X. The app works well and reloads the PDF file when it is updated. The problem is that it goes back to the first page of the PDF when it is reloaded and you need to manually scroll back to the current page.

Fortunately, there is another PDF reader app called [Skim](http://skim-app.sourceforge.net/) that reloads PDF without loosing the current reading position. Turn on the "Check for file changes" setting in its *Sync* preferences, open your PDF document and it will reload each time you rebuild your LaTeX document from Sublime Text.

I hope that was useful. If you have any difficulties with the setup please leave a comment below.