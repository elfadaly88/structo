using System;
using System.Collections.Generic;

namespace Structo.Core.DTOs.Projects;

public class ProjectMemberAssignDto
{
    public List<Guid> UserIds { get; set; } = [];
}
