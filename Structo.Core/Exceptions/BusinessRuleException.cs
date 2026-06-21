using System;

namespace Structo.Core.Exceptions;

public class BusinessRuleException(string message) : Exception(message)
{
}
