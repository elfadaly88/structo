import re

path = r'e:\private\structo\structo\Structo.Client\src\app\features\dashboard\projects\project-details.component.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the outer modal wrapper max-h-[95vh]
content = re.sub(
    r'max-h-\[95vh\] overflow-y-auto( rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10)',
    r'max-h-[92vh] flex flex-col\1',
    content
)
# And the 90vh one
content = re.sub(
    r'max-h-\[90vh\] overflow-y-auto( rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10)',
    r'max-h-[92vh] flex flex-col\1',
    content
)

# 2. Add overflow to the inner forms/divs that follow the headers in modals
# Pattern: <form [formGroup]="..." (ngSubmit)="..." class="space-y-...">
# Only replace ones that are likely modal forms (i.e. class="space-y-4" or "space-y-4 font-sans")
content = re.sub(
    r'<form (\[formGroup\]="[^"]+" )?\(ngSubmit\)="([^"]+)" class="(space-y-[45](?: font-sans)?)">',
    r'<form \1(ngSubmit)="\2" class="\3 overflow-y-auto min-h-0 pr-1 flex-1">',
    content
)

# For the forms that don't have formGroup (like submitApproveRequest)
content = re.sub(
    r'<form \(ngSubmit\)="([^"]+)" class="(space-y-[45](?: font-sans)?)">',
    r'<form (ngSubmit)="\1" class="\2 overflow-y-auto min-h-0 pr-1 flex-1">',
    content
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
